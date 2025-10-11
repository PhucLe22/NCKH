import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExamRepository } from './exam.repository';
import { Exam } from './exam.entity';
import { Question } from '../question/question.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CreateExamDto } from './dto/exam.create.dto';
import { UpdateExamDto } from './dto/exam.update.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { TeacherRepository } from '../teacher/teacher.repository';
import { VerifyExamCodeDto } from './dto/exam.verify.dto';
import * as bcrypt from 'bcrypt';
import { AIService } from '../ai_agent/ai_agent.service';
import { QuestionRepository } from '../question/question.repository';
import { OptionRepository } from '../option/option.repositoy';
import { AnswerRepository } from '../answer/answer.repository';
import { ExamUploadDto } from './dto/exam.upload.dto';

@Injectable()
export class ExamService {
  constructor(
    private readonly examRepository: ExamRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly jwtService: JwtService,
    private readonly teacherRepository: TeacherRepository,
    private readonly aiService: AIService,
    private readonly optionRepository: OptionRepository,
    private readonly answerRepository: AnswerRepository,
  ) { }

  async createExam(createExamDto: CreateExamDto, req: Request) {
    const exam = new Exam();
    exam.title = createExamDto.title;
    exam.description = createExamDto.description || '';
    exam.start_time = createExamDto.start_time;
    exam.end_time = createExamDto.end_time;
    exam.duration = createExamDto.duration;
    exam.code = createExamDto.code;

    const token = req.cookies?.token;
    const decoded: any = this.jwtService.decode(token);

    const teacher = await this.teacherRepository.getTeacherByUserId(decoded.sub);
    if (!teacher) {
      throw new Error('Teacher not found for this user');
    }

    exam.teacher = teacher;

    const createdExam = await this.examRepository.createExam(exam);
    return createdExam;
  } 

  async findAll() {
    const exams = await this.examRepository.findAll();
    const resList = [];
    for(const exam of exams)
    {
      if(exam.status === 'private'){
        resList.push({
          exam_id: exam.exam_id,
          title: exam.title,
          description: exam.description,
          code: exam.code,
          start_time: exam.start_time,
          end_time: exam.end_time,
          duration: exam.duration,
          status: exam.status,
          createdAt: exam.createdAt,
          updatedAt: exam.updatedAt,
        })
      }
      else if (exam.status === 'public'){
        resList.push({
          exam_id: exam.exam_id,
          title: exam.title,
          description: exam.description,
          code: exam.code,
          start_time: exam.start_time,
          end_time: exam.end_time,
          duration: exam.duration,
          status: exam.status,
          createdAt: exam.createdAt,
          updatedAt: exam.updatedAt,
        })
      }
    }
    return resList;
  }

  async updateExamById(exam_id: number, UpdateExamDto: UpdateExamDto, req: Request) {
    const token = req.cookies?.token;
    const decoded: any = this.jwtService.decode(token);
    const teacher = await this.teacherRepository.getTeacherByUserId(decoded.sub);
    if (!teacher) {
      throw new NotFoundException('Teacher not found for this user!');
    }

    const examToUpdate = await this.examRepository.findExamById(exam_id);
    if (!examToUpdate) {
      throw new NotFoundException(`Exam not found with ID: ${exam_id}!`);
    }

    if (examToUpdate.teacher.teacher_id !== teacher.teacher_id) {
      throw new ForbiddenException('You do not have permission to edit this exam!');
    }
    await this.examRepository.updateExam(exam_id, UpdateExamDto);
    return { message: 'Update exam successfully!' };
  }

  async deleteExamById(exam_id: number, req: Request) {
    const token = req.cookies?.token;
    const decoded: any = this.jwtService.decode(token);
    const teacher = await this.teacherRepository.getTeacherByUserId(decoded.sub);
    if (!teacher) {
      throw new NotFoundException('Teacher not found for this user!');
    }

    const examToDelete = await this.examRepository.findExamById(exam_id);
    if (!examToDelete) {
      throw new NotFoundException(`Exam not found with ID: ${exam_id}!`);
    }

    if (examToDelete.teacher.teacher_id !== teacher.teacher_id) {
      throw new ForbiddenException('You do not have permission to delete this exam!');
    }
    await this.examRepository.deleteExam(exam_id);
    return { message: 'Delete exam successfully!' };
  }

  async verifyExamCode(exam_id: number, VerifyExamCodeDto: VerifyExamCodeDto) {
    const exam = await this.examRepository.findExamById(exam_id);
    if (!exam) {
      throw new NotFoundException(`Exam not found with ID: ${exam_id}!`);
    }

    const isValid = await bcrypt.compare(VerifyExamCodeDto.code, exam.code);
    if (!isValid) {
      throw new UnauthorizedException('Invalid exam code!');
    }

    return { message: 'Exam code is valid!' };
  }

  async findExamsByTeacher(req: Request) {
    const token = req.cookies?.token;
    if (!token) throw new UnauthorizedException('Missing authentication token!');
  
    const decoded: any = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  
    const teacher = await this.teacherRepository.getTeacherByUserId(decoded.sub);
    if (!teacher) {
      throw new NotFoundException('Teacher not found for this user!');
    }
  
    const exams = await this.examRepository.find({
      where: { teacher: { teacher_id: teacher.teacher_id } },
      relations: ['teacher', 'questions'],
    });
  
    if (!exams.length) {
      throw new NotFoundException('No exams found for this teacher!');
    }
    return exams
  }

  // AI Agent
  async createExamFromAIFile(exam_id: number, file: Express.Multer.File, req: Request) {
    const exam = await this.examRepository.findOne({ where: { exam_id: exam_id } });
    if (!exam) throw new Error('Exam not found');
  
    const aiData = await this.aiService.generateQuestionsFromFile(file);
  
    exam.key_points = aiData.key_points || null;
    await this.examRepository.save(exam);
  
    const questionList = aiData.questions || [];
  
    for (const q of questionList) {
      const questionEntity = await this.questionRepository.createQuestion({
        exam: exam,
        content: q.question || '',
        type: q.type || 'multiple_choice',
        score: q.score || 1,
      } as Question);
  
      if (q.options && q.options.length > 0) {
        const optionsEntities = await Promise.all(
          q.options.map(async (opt) => {
            const optionEntity = await this.optionRepository.createOption({
              question: questionEntity,
              content: opt.content || opt.text || '',
              is_correct: opt.is_correct || opt.content === q.answer
            });
            if (optionEntity.is_correct) {
              await this.answerRepository.createAnswer({
                question: questionEntity,
                option: optionEntity,
                studentId: null,
                text: null,
              });
            }
            return optionEntity;
          })
        );
        questionEntity.options = optionsEntities;       
       }
  
      if (!q.options && q.answer) {
        await this.answerRepository.createAnswer({
          question: questionEntity,
          option: null,
          studentId: null,
          text: q.answer,
        });
      }
    }
  
    return {
      message: 'AI-generated questions added successfully!',
      exam_id: exam.exam_id,
      total_questions: questionList.length,
    };
  }
}
