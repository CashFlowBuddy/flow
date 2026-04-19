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
      data: {
        id,
        url,
        userId,
        title: dto.title,
        description: dto.description,
        category: dto.category,
        price: dto.price,
      },
      include: { pictures: true, user: { select: { id: true, name: true, image: true } } },
    });
  }

  async findAll(category?: string, search?: string) {
    return this.prisma.listing.findMany({
      where: {
      ...(category ? { category: category as any } : {}),
      ...(search ? { OR: [{ title: { contains: search } }, { description: { contains: search } }] } : {}),
      status: { in: ['AVAILABLE', 'FROZEN'] },
      },
      include: { pictures: true, user: { select: { id: true, name: true, image: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllAdmin(status?: string, isAdmin: boolean = false) {
    if (!isAdmin) {
      throw new ForbiddenException('Only admins can view all listings');
    }
    return this.prisma.listing.findMany({
      where: {
        ...(status ? { status: status as any } : {}),
      },
      include: { pictures: true, user: { select: { id: true, name: true, image: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(idOrUrl: string, userId?: string) {
    const listing = await this.prisma.listing.findFirst({
      where: {
        OR: [{ id: idOrUrl }, { url: idOrUrl }],
      },
      include: {
        pictures: true,
        user: { select: { id: true, name: true, image: true, role: true } },
        ...(userId
          ? { savedBy: { where: { id: userId }, select: { id: true } } }
          : {}),
      },
    });
    if (!listing) throw new NotFoundException('Listing not found');
    if (!userId) return listing;

    const isSaved = listing.savedBy?.length > 0;
    const { savedBy, ...rest } = listing;
    return { ...rest, isSaved };
  }

  async findByUser(userId: string) {
    return this.prisma.listing.findMany({
      where: { userId },
      include: { pictures: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, dto: UpdateListingDto, userId: string, isAdmin: boolean = false) {
    const listing = await this.prisma.listing.findUnique({ where: { id } });
    if (!listing) throw new NotFoundException('Listing not found');
    if (listing.userId !== userId && !isAdmin) throw new ForbiddenException('You can only edit your own listings');
    
    if (dto.status) {
      if (dto.status !== 'PENDING' && listing.status === 'PENDING' && !isAdmin) {
        throw new ForbiddenException('Only admins can change listings from pending status');
      }
      if (dto.status === 'ARCHIVED' && listing.status !== 'ARCHIVED' && !isAdmin) {
        throw new ForbiddenException('Only admins can archive listings');
      }
      if (listing.status === 'ARCHIVED' && !isAdmin) {
        throw new ForbiddenException('Only admins can change listings from archived status');
      }
    }

    const dataToUpdate: Record<string, any> = {};
    if (typeof dto.title === 'string') dataToUpdate.title = dto.title;
    if (typeof dto.description === 'string') dataToUpdate.description = dto.description;
    if (dto.category) dataToUpdate.category = dto.category;

    if (typeof dto.price === 'number') {
      if (dto.price < listing.price) {
        dataToUpdate.discountedPrice = dto.price;
      } else if (dto.price > listing.price) {
        dataToUpdate.price = dto.price;
        dataToUpdate.discountedPrice = null;
      }
    }

    if (dto.status) dataToUpdate.status = dto.status;
    
    return this.prisma.listing.update({
      where: { id },
      data: dataToUpdate,
      include: { pictures: true, user: { select: { id: true, name: true, image: true } } },
    });
  }

  async remove(id: string, userId: string, isAdmin: boolean = false) {
    const listing = await this.prisma.listing.findUnique({ where: { id } });
    if (!listing) throw new NotFoundException('Listing not found');
    if (listing.userId !== userId && !isAdmin) throw new ForbiddenException('You can only delete your own listings');
    return this.prisma.listing.delete({ where: { id } });
  }

  async save(listingId: string, userId: string) {
    const listing = await this.prisma.listing.findFirst({
      where: { OR: [{ id: listingId }, { url: listingId }] },
    });
    if (!listing) throw new NotFoundException('Listing not found');
    return this.prisma.listing.update({
      where: { id: listing.id },
      data: { savedBy: { connect: { id: userId } } },
    });
  }

  async unsave(listingId: string, userId: string) {
    const listing = await this.prisma.listing.findFirst({
      where: { OR: [{ id: listingId }, { url: listingId }] },
    });
    if (!listing) throw new NotFoundException('Listing not found');
    return this.prisma.listing.update({
      where: { id: listing.id },
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
