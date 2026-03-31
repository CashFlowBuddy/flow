import { ApiProperty } from '@nestjs/swagger';

export class MessageEntity {
  @ApiProperty({ example: 'clxyz123' })
  id: string;

  @ApiProperty({ example: 'Yes, it is!' })
  content: string;

  @ApiProperty({ example: 'clxyz123' })
  byUserId: string;

  @ApiProperty({ example: 'clxyz123' })
  chatRoomId: string;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
