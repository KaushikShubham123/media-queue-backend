import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobStatus } from './enums/job-status.enum';

@Injectable()
export class JobsProcessor {
    constructor(
        @InjectRepository(Job)
        private readonly repo: Repository<Job>,
    ) { }

    // Runs every 2 seconds
    @Cron('*/2 * * * * *')
    async handleCron() {
        await this.process();
    }

    async process() {
        const job = await this.repo.findOne({
            where: { status: JobStatus.PENDING },
        });

        if (!job) return;

        job.status = JobStatus.PROCESSING;
        await this.repo.save(job);

        const total =
            job.fileType === 'video' ? 5000 :
                job.fileType === 'image' ? 2000 : 3000;

        for (const p of [25, 50, 75, 100]) {
            await new Promise(r => setTimeout(r, total / 4));
            job.progress = p;
            await this.repo.save(job);
        }

        job.status = JobStatus.COMPLETED;
        job.result = {
            processedAt: new Date(),
            outputFormat: 'mock',
            duration: 120,
        };

        await this.repo.save(job);
    }
}
