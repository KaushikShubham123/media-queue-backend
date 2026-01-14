import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { JobStatus } from './enums/job-status.enum';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Job)
        private readonly repo: Repository<Job>,
    ) { }

    create(dto: CreateJobDto) {
        return this.repo.save(dto);
    }

    findOne(id: string) {
        return this.repo.findOneBy({ id });
    }

    async findAll(query: {
        status?: JobStatus;
        fileType?: string;
        page: number;
        limit: number;
    }) {
        const { status, fileType, page, limit } = query;

        const where: any = {};
        if (status) where.status = status;
        if (fileType) where.fileType = fileType;

        const [data, total] = await this.repo.findAndCount({
            where,
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async cancel(id: string) {
        const job = await this.findOne(id);
        if (!job) throw new NotFoundException();

        if ([JobStatus.COMPLETED, JobStatus.FAILED].includes(job.status)) {
            throw new BadRequestException('Cannot cancel completed job');
        }

        job.status = JobStatus.CANCELLED;
        return this.repo.save(job);
    }
}
