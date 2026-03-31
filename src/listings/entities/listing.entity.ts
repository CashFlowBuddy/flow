import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum StatusEnum {
  AVAILABLE = 'AVAILABLE',
  PENDING = 'PENDING',
  FROZEN = 'FROZEN',
  SOLD = 'SOLD',
  ARCHIVED = 'ARCHIVED',
}

export enum CategoryEnum {
  ELECTRONICS = 'ELECTRONICS',
  FASHION = 'FASHION',
  HOME = 'HOME',
  TOYS = 'TOYS',
  BOOKS = 'BOOKS',
  SPORTS = 'SPORTS',
  OTHER = 'OTHER',
}

export class ListingEntity {
  @ApiProperty({ example: 'clxyz123' })
  id: string;

  @ApiProperty({ example: 'iPhone 15 Pro' })
  title: string;

  @ApiProperty({ example: 'iphone-15-pro' })
  url: string;

  @ApiProperty({ example: 'Brand new, sealed in box' })
  description: string;

  @ApiProperty({ enum: StatusEnum, example: StatusEnum.AVAILABLE })
  status: StatusEnum;

  @ApiProperty({ enum: CategoryEnum, example: CategoryEnum.ELECTRONICS })
  category: CategoryEnum;

  @ApiProperty({ example: 999.99 })
  price: number;

  @ApiPropertyOptional({ example: 899.99, nullable: true })
  discountedPrice: number | null;

  @ApiProperty({ example: 'clxyz123' })
  userId: string;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
