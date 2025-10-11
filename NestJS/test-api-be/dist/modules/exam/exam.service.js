"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamService = void 0;
const common_1 = require("@nestjs/common");
const exam_repository_1 = require("./exam.repository");
const exam_entity_1 = require("./exam.entity");
const question_entity_1 = require("../question/question.entity");
const jwt_1 = require("@nestjs/jwt");
const common_2 = require("@nestjs/common");
const teacher_repository_1 = require("../teacher/teacher.repository");
const bcrypt = require("bcrypt");
const ai_agent_service_1 = require("../ai_agent/ai_agent.service");
const question_repository_1 = require("../question/question.repository");
const option_repositoy_1 = require("../option/option.repositoy");
const answer_repository_1 = require("../answer/answer.repository");
let ExamService = class ExamService {
    constructor(examRepository, questionRepository, jwtService, teacherRepository, aiService, optionRepository, answerRepository) {
        this.examRepository = examRepository;
        this.questionRepository = questionRepository;
        this.jwtService = jwtService;
        this.teacherRepository = teacherRepository;
        this.aiService = aiService;
        this.optionRepository = optionRepository;
        this.answerRepository = answerRepository;
    }
    async createExam(createExamDto, req) {
        const exam = new exam_entity_1.Exam();
        exam.title = createExamDto.title;
        exam.description = createExamDto.description || '';
        exam.start_time = createExamDto.start_time;
        exam.end_time = createExamDto.end_time;
        exam.duration = createExamDto.duration;
        exam.code = createExamDto.code;
        const token = req.cookies?.token;
        const decoded = this.jwtService.decode(token);
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
        for (const exam of exams) {
            if (exam.status === 'private') {
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
                });
            }
            else if (exam.status === 'public') {
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
                });
            }
        }
        return resList;
    }
    async updateExamById(exam_id, UpdateExamDto, req) {
        const token = req.cookies?.token;
        const decoded = this.jwtService.decode(token);
        const teacher = await this.teacherRepository.getTeacherByUserId(decoded.sub);
        if (!teacher) {
            throw new common_2.NotFoundException('Teacher not found for this user!');
        }
        const examToUpdate = await this.examRepository.findExamById(exam_id);
        if (!examToUpdate) {
            throw new common_2.NotFoundException(`Exam not found with ID: ${exam_id}!`);
        }
        if (examToUpdate.teacher.teacher_id !== teacher.teacher_id) {
            throw new common_2.ForbiddenException('You do not have permission to edit this exam!');
        }
        await this.examRepository.updateExam(exam_id, UpdateExamDto);
        return { message: 'Update exam successfully!' };
    }
    async deleteExamById(exam_id, req) {
        const token = req.cookies?.token;
        const decoded = this.jwtService.decode(token);
        const teacher = await this.teacherRepository.getTeacherByUserId(decoded.sub);
        if (!teacher) {
            throw new common_2.NotFoundException('Teacher not found for this user!');
        }
        const examToDelete = await this.examRepository.findExamById(exam_id);
        if (!examToDelete) {
            throw new common_2.NotFoundException(`Exam not found with ID: ${exam_id}!`);
        }
        if (examToDelete.teacher.teacher_id !== teacher.teacher_id) {
            throw new common_2.ForbiddenException('You do not have permission to delete this exam!');
        }
        await this.examRepository.deleteExam(exam_id);
        return { message: 'Delete exam successfully!' };
    }
    async verifyExamCode(exam_id, VerifyExamCodeDto) {
        const exam = await this.examRepository.findExamById(exam_id);
        if (!exam) {
            throw new common_2.NotFoundException(`Exam not found with ID: ${exam_id}!`);
        }
        const isValid = await bcrypt.compare(VerifyExamCodeDto.code, exam.code);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Invalid exam code!');
        }
        return { message: 'Exam code is valid!' };
    }
    async findExamsByTeacher(req) {
        const token = req.cookies?.token;
        if (!token)
            throw new common_1.UnauthorizedException('Missing authentication token!');
        const decoded = this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET,
        });
        const teacher = await this.teacherRepository.getTeacherByUserId(decoded.sub);
        if (!teacher) {
            throw new common_2.NotFoundException('Teacher not found for this user!');
        }
        const exams = await this.examRepository.find({
            where: { teacher: { teacher_id: teacher.teacher_id } },
            relations: ['teacher', 'questions'],
        });
        if (!exams.length) {
            throw new common_2.NotFoundException('No exams found for this teacher!');
        }
        return exams;
    }
    async createExamFromAIFile(exam_id, file, req) {
        const exam = await this.examRepository.findOne({
            where: { exam_id: exam_id },
            relations: ['teacher']
        });
        if (!exam)
            throw new Error('Exam not found');
        if (!exam.teacher)
            throw new Error('Exam must be associated with a teacher');
        const aiData = await this.aiService.generateQuestionsFromFile(file);
        if (!aiData || !aiData.questions || aiData.questions.length === 0) {
            throw new Error('Failed to generate questions from AI service');
        }
        exam.key_points = aiData.key_points || null;
        await this.examRepository.save(exam);
        const questionList = aiData.questions || [];
        const typeMap = {
            mcq: question_entity_1.QuestionType.MULTIPLE_CHOICE,
            essay: question_entity_1.QuestionType.ESSAY,
            true_false: question_entity_1.QuestionType.TRUE_FALSE,
        };
        for (const q of questionList) {
            console.log('Creating question with data:', {
                content: q.content,
                type: q.type,
                score: q.estimateScore
            });
            const question = new question_entity_1.Question();
            question.exam = exam;
            question.content = q.content || 'No content provided';
            question.type = typeMap[q.type] || question_entity_1.QuestionType.ESSAY;
            question.score = q.estimateScore || 1;
            question.options = [];
            question.answers = [];
            console.log('Saving question to database...');
            const questionEntity = await this.questionRepository.save(question);
            console.log('Question saved with ID:', questionEntity.question_id);
            if (q.options && q.options.length > 0 && typeMap[q.type] === question_entity_1.QuestionType.MULTIPLE_CHOICE) {
                const optionsEntities = await Promise.all(q.options.map(async (opt) => {
                    const optionEntity = await this.optionRepository.createOption({
                        question: questionEntity,
                        content: opt.content || 'No content provided',
                        is_correct: opt.is_correct || opt.content === q.sampleAnswer
                    });
                    return optionEntity;
                }));
                questionEntity.options = optionsEntities;
            }
            if (!q.options && q.sampleAnswer) {
                console.log(`Sample answer for question: ${q.sampleAnswer}`);
            }
        }
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
};
exports.ExamService = ExamService;
exports.ExamService = ExamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [exam_repository_1.ExamRepository,
        question_repository_1.QuestionRepository,
        jwt_1.JwtService,
        teacher_repository_1.TeacherRepository,
        ai_agent_service_1.AIService,
        option_repositoy_1.OptionRepository,
        answer_repository_1.AnswerRepository])
], ExamService);
//# sourceMappingURL=exam.service.js.map