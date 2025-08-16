import { IsNumber, IsString } from 'class-validator';

export class CreateCollectionDto {
  @IsNumber()
  userId: number;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
