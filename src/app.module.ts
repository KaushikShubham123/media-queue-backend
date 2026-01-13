import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './jobs/entities/job.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    database: 'media_queue',
    entities: [Job],
    synchronize: true,
  }),
  ScheduleModule.forRoot(),
    JobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
