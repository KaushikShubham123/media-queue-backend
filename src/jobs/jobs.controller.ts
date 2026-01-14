import { Controller, Post, Get, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JobStatus } from './enums/job-status.enum';

@ApiTags('Jobs')
@Controller('api/jobs')
export class JobsController {
    constructor(private readonly service: JobsService) { }

    @Post()
    @ApiOperation({ summary: 'Create job' })
    create(@Body() dto: CreateJobDto) {
        return this.service.create(dto);
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Get()
    @ApiQuery({ name: 'status', required: false, enum: JobStatus })
    @ApiQuery({ name: 'fileType', required: false })
    @ApiQuery({ name: 'page', required: false, example: 1 })
    @ApiQuery({ name: 'limit', required: false, example: 10 })
    getAll(
        @Query('status') status?: JobStatus,
        @Query('fileType') fileType?: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ) {
        return this.service.findAll({
            status,
            fileType,
            page: Number(page),
            limit: Number(limit),
        });
    }

    @Delete(':id')
    cancel(@Param('id') id: string) {
        return this.service.cancel(id);
    }
}
