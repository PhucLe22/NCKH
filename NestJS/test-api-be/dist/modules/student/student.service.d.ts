import { StudentRepository } from './student.repository';
import { UserRepository } from '../user/user.repository';
import { ExamRepository } from '../exam/exam.repository';
import { Student } from './student.entity';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
export declare class StudentService {
    private readonly studentRepository;
    private readonly userRepository;
    private readonly examRepository;
    private readonly jwtService;
    constructor(studentRepository: StudentRepository, userRepository: UserRepository, examRepository: ExamRepository, jwtService: JwtService);
    joinExam(req: Request, examId: number, examCode?: string): Promise<Student>;
}
