import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExamRepository } from './exam.repository';
import { Exam } from './exam.entity';
import { Question, QuestionType } from '../question/question.entity';
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
    const exam = await this.examRepository.findOne({ 
      where: { exam_id: exam_id },
      relations: ['teacher']
    });
    
    if (!exam) throw new Error('Exam not found');
    if (!exam.teacher) throw new Error('Exam must be associated with a teacher');
  
    const aiData = await this.aiService.generateQuestionsFromFile(file);

    if (!aiData || !aiData.questions || aiData.questions.length === 0) {
      throw new Error('Failed to generate questions from AI service');
    }
  
    exam.key_points = aiData.key_points || null;
    await this.examRepository.save(exam);
  
    const questionList = aiData.questions || [];

    const typeMap = {
      mcq: QuestionType.MULTIPLE_CHOICE,
      essay: QuestionType.ESSAY,
      true_false: QuestionType.TRUE_FALSE,
    };

    for (const q of questionList) {
      console.log('Creating question with data:', {
        content: q.content,
        type: q.type,
        score: q.estimateScore
      });
      
      const question = new Question();
      question.exam = exam;
      question.content = q.content || 'No content provided';
      question.type = typeMap[q.type] || QuestionType.ESSAY;
      question.score = q.estimateScore || 1;
      question.options = [];
      question.answers = [];
      
      console.log('Saving question to database...');
      const questionEntity = await this.questionRepository.save(question);
      console.log('Question saved with ID:', questionEntity.question_id);
  
      if (q.options && q.options.length > 0 && typeMap[q.type] === QuestionType.MULTIPLE_CHOICE) {
        const optionsEntities = await Promise.all(
          q.options.map(async (opt) => {
            const optionEntity = await this.optionRepository.createOption({
              question: questionEntity,
              content: opt.content || 'No content provided',
              is_correct: opt.is_correct || opt.content === q.sampleAnswer
            });
            // Don't create an answer record if there's no studentId
            // as it's a required field in the Answer entity
            // For sample/correct answers, we can either:
            // 1. Store the correct option in the question itself, or
            // 2. Create a separate table for sample answers
            // For now, we'll skip creating answer records for sample questions
            
            // If you need to store correct answers, you could:
            // 1. Add a 'correctOptionId' field to the Question entity, or
            // 2. Create a separate 'SampleAnswer' entity
            
            // Example of how you might implement this in the future:
            // question.correctOption = optionEntity;
            return optionEntity;
          })
        );
        questionEntity.options = optionsEntities;       
       }
  
      // For essay questions with sample answers, we'll store them in a different way
      // since we can't create an answer record without a studentId
      // You might want to store sample answers in a different table or as part of the question
      if (!q.options && q.sampleAnswer) {
        // Store the sample answer in the question's metadata or a separate table
        // For now, we'll just log it
        console.log(`Sample answer for question: ${q.sampleAnswer}`);
        
        // If you want to store sample answers, you could:
        // 1. Add a 'sampleAnswer' field to the Question entity
        // 2. Or create a separate 'SampleAnswer' entity
        // 
        // Example:
        // question.sampleAnswer = q.sampleAnswer;
        // await this.questionRepository.save(question);
      }
    }
    
    // Verify questions were saved
    const savedQuestions = await this.questionRepository.find({
      where: { exam: { exam_id: exam.exam_id } },
      relations: ['options']
    });
    
    console.log(`Found ${savedQuestions.length} questions in database for exam ${exam.exam_id}`);
    console.log('Saved questions:', savedQuestions.map(q => ({
      id: q.question_id,
      content: q.content,
      type: q.type,
      options: q.options?.length || 0
    })));
    
    return {
      message: 'AI-generated questions added successfully!',
      exam_id: exam.exam_id,
      questions: questionList,
      savedQuestions: savedQuestions.length
    };
  }
}
