import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Exam } from './exam.entity';
import { UpdateExamDto } from './dto/exam.update.dto';

@Injectable()
export class ExamRepository extends Repository<Exam> {
    constructor(private dataSource: DataSource) {
        super(Exam, dataSource.createEntityManager());
    }
    async createExam(exam: Exam) {
        return this.save(exam);
    }
    async findAll() {
        return this.find({
            relations: ['questions'],
        });
    }
    async findExamById(exam_id: number): Promise<Exam> {
        return this.findOne({
            where: { exam_id },
            relations: ['teacher'],
        });
    }
    async updateExam(exam_id: number, UpdateExamDto: UpdateExamDto) {
        return this.update({ exam_id }, UpdateExamDto);
    }

    async deleteExam(exam_id: number) {
        return this.delete({ exam_id });
    }

    async findTeacherIdByUserId(user_id: number): Promise<number> {
        const result = await this.createQueryBuilder('exam')
            .leftJoinAndSelect('exam.teacher', 'teacher')
            .where('teacher.user_id = :user_id', { user_id })
            .select('teacher.teacher_id')
            .getRawOne();

        return result ? result.teacher_id : null;
    }
}

