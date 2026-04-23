import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, Matches } from 'class-validator';

export class RegisterExpoPushTokenDto {
  @ApiPropertyOptional({
    description: 'User ID. If omitted, the authenticated user ID is used.',
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({
    description: 'Expo push token',
    example: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
  })
  @IsString()
  @Matches(/^(ExponentPushToken|ExpoPushToken)\[[^\]]+\]$/)
  expoPushToken: string;

  @ApiProperty({ enum: ['ios', 'android'] })
  @IsString()
  @IsIn(['ios', 'android'])
  platform: 'ios' | 'android';
}
