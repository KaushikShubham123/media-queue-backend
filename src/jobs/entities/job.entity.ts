import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';
import { JobStatus } from '../enums/job-status.enum';

@Entity('jobs')
@Index(['status'])
@Index(['fileType'])
export class Job {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    fileName: string;

    @Column('bigint')
    fileSize: number;

    @Column()
    fileType: string;

    @Column({ default: JobStatus.PENDING })
    status: JobStatus;

    @Column({ default: 0 })
    progress: number;

    @Column({ type: 'jsonb', nullable: true })
    result: any;

    @Column({ nullable: true })
    errorMessage?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
