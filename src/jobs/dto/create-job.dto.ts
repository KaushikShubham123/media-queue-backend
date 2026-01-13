import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Max, MaxLength, Min } from 'class-validator';

export enum FileType {
    VIDEO = 'video',
    IMAGE = 'image',
    AUDIO = 'audio',
}

export class CreateJobDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    fileName: string;

    @ApiProperty({ description: 'Size in bytes' })
    @IsInt()
    @Min(1)
    @Max(5368709120)
    fileSize: number;

    @ApiProperty({ enum: FileType })
    @IsEnum(FileType)
    fileType: FileType;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    callbackUrl?: string;
}
