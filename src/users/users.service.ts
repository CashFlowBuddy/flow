import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';

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
      select: { id: true, name: true, email: true, image: true, role: true, createdAt: true, listings: true },
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

  async remove(id: string, requesterId: string) {
    if (id !== requesterId) throw new ForbiddenException('You can only delete your own account');
    return this.prisma.user.delete({ where: { id } });
  }
}
