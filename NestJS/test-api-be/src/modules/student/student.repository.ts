import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Student } from './student.entity';
import { User } from '../user/user.entity';
import { Exam } from '../exam/exam.entity';


@Injectable()
export class StudentRepository extends Repository<Student> {
  constructor(private dataSource: DataSource) {
    super(Student, dataSource.createEntityManager());
  }
  async findByStudentAndExam(userId: number, examId: number): Promise<Student> {
    return this.createQueryBuilder('student')
      .leftJoinAndSelect('student.user', 'user')
      .leftJoinAndSelect('student.exams', 'exam')
      .where('student.user_id = :userId', { userId })
      .andWhere('exam.exam_id = :examId', { examId })
      .getOne();
  }
  async createByStudentAndExam(userId: number, examId: number): Promise<Student> {
    const user = await this.dataSource.getRepository(User).findOne({ where: { user_id: userId } });
    const exam = await this.dataSource.getRepository(Exam).findOne({ where: { exam_id: examId } });

    if (!user || !exam) {
      throw new Error('User or Exam not found');
    }

    const student = this.create({
      user: user,
      grade: ''
    });
    const savedStudent = await this.save(student);

    const studentWithExams = await this.findOne({
      where: { student_id: savedStudent.student_id },
      relations: ['exams']
    });

    if (studentWithExams) {
      studentWithExams.exams = [exam];
      return this.save(studentWithExams);
    }
    return savedStudent;
  }
}
