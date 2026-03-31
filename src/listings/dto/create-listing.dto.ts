import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  @ApiProperty({ example: 'iPhone 15 Pro' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Brand new, sealed in box' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: CategoryEnum, example: CategoryEnum.ELECTRONICS })
  @IsEnum(CategoryEnum)
  category: CategoryEnum;

  @ApiProperty({ example: 999.99, minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: 899.99, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discountedPrice?: number;
}
