import { ApiProperty } from '@nestjs/swagger';
import { ListingEntity } from 'src/listings/entities/listing.entity';

export class ChatRoomEntity {
  @ApiProperty({ example: 'clxyz123' })
  id: string;

  @ApiProperty({ example: 'clxyz123' })
  forListingId: string;

  forListing: ListingEntity;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
