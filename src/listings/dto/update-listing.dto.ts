import { IsString, IsOptional, IsEnum, IsNumber, Min } from 'class-validator';
import { CategoryEnum } from './create-listing.dto';

export enum StatusEnum {
  AVAILABLE = 'AVAILABLE',
  PENDING = 'PENDING',
  FROZEN = 'FROZEN',
  SOLD = 'SOLD',
  ARCHIVED = 'ARCHIVED',
}

export class UpdateListingDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;

  @IsOptional()
  @IsEnum(CategoryEnum)
  category?: CategoryEnum;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  discountedPrice?: number;
}
