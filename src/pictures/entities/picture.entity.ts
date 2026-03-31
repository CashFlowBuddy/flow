import { ApiProperty } from '@nestjs/swagger';

export class PictureEntity {
  @ApiProperty({ example: 'clxyz123' })
  id: string;

  @ApiProperty({ example: 'https://example.com/photo.jpg' })
  url: string;

  @ApiProperty({ example: 'clxyz123' })
  listingId: string;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
