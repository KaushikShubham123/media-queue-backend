import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Job } from './jobs/entities/job.entity';


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    entities: [Job],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
});
