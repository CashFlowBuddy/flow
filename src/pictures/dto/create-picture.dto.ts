import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePictureDto {
  @ApiProperty({ example: 'https://example.com/photo.jpg' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ example: 'clxyz123' })
  @IsString()
  @IsNotEmpty()
  listingId: string;
}
