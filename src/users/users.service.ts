import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true, image: true, role: true, createdAt: true },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        image: true,
        createdAt: true,
        listings: {
          where: { status: { in: ['AVAILABLE', 'FROZEN', 'SOLD'] } },
          orderBy: { createdAt: 'desc' },
          include: {
            pictures: true,
            user: { select: { id: true, name: true, image: true } },
          },
        },
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { listings: true, savedListings: true },
    });
    if (!user) throw new NotFoundException('User not found');
    const { ...rest } = user;
    return rest;
  }

  async update(id: string, dto: UpdateUserDto, requesterId: string) {
    if (id !== requesterId) throw new ForbiddenException('You can only update your own profile');
    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: { id: true, name: true, email: true, image: true, role: true, createdAt: true },
    });
  }

  async uploadAvatar(id: string, requesterId: string, imageUrl: string) {
    if (id !== requesterId) throw new ForbiddenException('You can only update your own profile');

    const existingUser = await this.prisma.user.findUnique({
      where: { id },
      select: { image: true },
    });

    if (!existingUser) throw new NotFoundException('User not found');

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { image: imageUrl },
      select: { id: true, name: true, email: true, image: true, role: true, createdAt: true },
    });

    if (existingUser.image?.startsWith('/uploads/avatars/')) {
      const oldFilePath = join(process.cwd(), existingUser.image.replace(/^\//, ''));
      try {
        await fs.unlink(oldFilePath);
      } catch {
        // Ignore missing files and keep API response successful.
      }
    }

    return updatedUser;
  }

  async remove(id: string, requesterId: string) {
    if (id !== requesterId) throw new ForbiddenException('You can only delete your own account');
    return this.prisma.user.delete({ where: { id } });
  }
}
