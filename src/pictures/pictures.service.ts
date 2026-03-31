import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreatePictureDto } from './dto/create-picture.dto';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'crypto';
import { join } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class PicturesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePictureDto, userId: string) {
    const listing = await this.prisma.listing.findUnique({ where: { id: dto.listingId } });
    if (!listing) throw new NotFoundException('Listing not found');
    if (listing.userId !== userId) throw new ForbiddenException('You can only add pictures to your own listings');
    return this.prisma.picture.create({
      data: { id: randomUUID(), ...dto },
    });
  }

  async findByListing(listingId: string) {
    return this.prisma.picture.findMany({
      where: { listingId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string) {
    const picture = await this.prisma.picture.findUnique({ where: { id } });
    if (!picture) throw new NotFoundException('Picture not found');
    return picture;
  }

  async remove(id: string, userId: string) {
    const picture = await this.prisma.picture.findUnique({
      where: { id },
      include: { listing: true },
    });
    if (!picture) throw new NotFoundException('Picture not found');
    if (picture.listing.userId !== userId) throw new ForbiddenException('You can only delete pictures from your own listings');
    const deleted = await this.prisma.picture.delete({ where: { id } });

    if (picture.url.startsWith('/uploads/')) {
      const filePath = join(process.cwd(), picture.url.replace(/^\//, ''));
      try {
        await fs.unlink(filePath);
      } catch {}
    }

    return deleted;
  }
}
