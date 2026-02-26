import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePictureDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  listingId: string;
}
