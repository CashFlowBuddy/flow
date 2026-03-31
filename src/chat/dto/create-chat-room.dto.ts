import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatRoomDto {
  @ApiProperty({ example: 'clxyz123', description: 'ID of the listing to chat about' })
  @IsString()
  @IsNotEmpty()
  listingId: string;
}
