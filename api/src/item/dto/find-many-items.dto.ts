import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class FindManyItemsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  skip?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  take?: number;

  @IsOptional()
  @Type(() => String)
  @IsNumber()
  cursor?: string;

  @IsOptional()
  @Type(() => String)
  @IsNumber()
  where?: string;

  @IsOptional()
  @Type(() => String)
  @IsNumber()
  orderBy?: string;
}
