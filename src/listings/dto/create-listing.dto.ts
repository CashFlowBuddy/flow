import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

export enum CategoryEnum {
  ELECTRONICS = 'ELECTRONICS',
  FASHION = 'FASHION',
  HOME = 'HOME',
  TOYS = 'TOYS',
  BOOKS = 'BOOKS',
  SPORTS = 'SPORTS',
  OTHER = 'OTHER',
}

export class CreateListingDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(CategoryEnum)
  category: CategoryEnum;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  discountedPrice?: number;
}
