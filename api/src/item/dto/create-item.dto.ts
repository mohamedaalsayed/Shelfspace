import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
  IsDate,
} from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  progress: number;

  @IsDate()
  @IsNotEmpty()
  addedAt: Date;
}
