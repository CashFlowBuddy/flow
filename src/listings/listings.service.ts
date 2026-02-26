import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateListingDto, userId: string) {
    const id = randomUUID();
    const url = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + id.slice(0, 8);
    return this.prisma.listing.create({
      data: { id, url, userId, ...dto },
      include: { pictures: true, user: { select: { id: true, name: true, image: true } } },
    });
  }

  async findAll(category?: string, search?: string) {
    return this.prisma.listing.findMany({
      where: {
        ...(category ? { category: category as any } : {}),
        ...(search ? { title: { contains: search } } : {}),
        status: 'AVAILABLE',
      },
      include: { pictures: true, user: { select: { id: true, name: true, image: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: { pictures: true, user: { select: { id: true, name: true, image: true } } },
    });
    if (!listing) throw new NotFoundException('Listing not found');
    return listing;
  }

  async findByUser(userId: string) {
    return this.prisma.listing.findMany({
      where: { userId },
      include: { pictures: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, dto: UpdateListingDto, userId: string) {
    const listing = await this.prisma.listing.findUnique({ where: { id } });
    if (!listing) throw new NotFoundException('Listing not found');
    if (listing.userId !== userId) throw new ForbiddenException('You can only edit your own listings');
    return this.prisma.listing.update({
      where: { id },
      data: dto,
      include: { pictures: true, user: { select: { id: true, name: true, image: true } } },
    });
  }

  async remove(id: string, userId: string) {
    const listing = await this.prisma.listing.findUnique({ where: { id } });
    if (!listing) throw new NotFoundException('Listing not found');
    if (listing.userId !== userId) throw new ForbiddenException('You can only delete your own listings');
    return this.prisma.listing.delete({ where: { id } });
  }

  async save(listingId: string, userId: string) {
    return this.prisma.listing.update({
      where: { id: listingId },
      data: { savedBy: { connect: { id: userId } } },
    });
  }

  async unsave(listingId: string, userId: string) {
    return this.prisma.listing.update({
      where: { id: listingId },
      data: { savedBy: { disconnect: { id: userId } } },
    });
  }

  async findSaved(userId: string) {
    return this.prisma.listing.findMany({
      where: { savedBy: { some: { id: userId } } },
      include: { pictures: true, user: { select: { id: true, name: true, image: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
