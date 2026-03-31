import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class TypingDto {
  @IsString()
  @IsNotEmpty()
  chatRoomId: string;

  @IsBoolean()
  isTyping: boolean;
}
