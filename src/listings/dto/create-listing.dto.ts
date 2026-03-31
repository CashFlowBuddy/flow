import { IsString, IsNotEmpty, IsEnum, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ example: 999, minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number;
}
