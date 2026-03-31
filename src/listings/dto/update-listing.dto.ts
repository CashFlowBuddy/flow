import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateListingDto } from './create-listing.dto';

export enum StatusEnum {
  AVAILABLE = 'AVAILABLE',
  PENDING = 'PENDING',
  FROZEN = 'FROZEN',
  SOLD = 'SOLD',
  ARCHIVED = 'ARCHIVED',
}

export class UpdateListingDto extends PartialType(CreateListingDto) {
  @ApiPropertyOptional({ enum: StatusEnum, example: StatusEnum.AVAILABLE })
  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;
}
