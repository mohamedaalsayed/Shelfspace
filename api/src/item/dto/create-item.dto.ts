import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
  IsDate,
  IsEnum,
} from 'class-validator';
import { ReadingStatus } from '@prisma/client';

export class UserConnectDto {
  @IsNumber()
  id: number;
}

export class CreateItemDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsOptional()
  sourceUrl: string;

  @IsUrl()
  @IsOptional()
  fileUrl: string;

  @IsString()
  @IsNotEmpty()
  itemType: string;

  @IsEnum(ReadingStatus)
  @IsNotEmpty()
  status: ReadingStatus;

  @IsNumber()
  @IsNotEmpty()
  progress: number;

  @IsDate()
  @IsNotEmpty()
  addedAt: Date;
}
