import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(listingId: string, requestingUserId: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
      select: { id: true, userId: true },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.userId === requestingUserId) {
      throw new BadRequestException('You cannot start a chat on your own listing');
    }
    const existingRoom = await this.prisma.chatRoom.findFirst({
      where: {
        forListingId: listingId,
        users: {
          every: {
            id: { in: [requestingUserId, listing.userId] },
          },
        },
      },
      include: { users: { select: { id: true, name: true } } },
    });

    if (existingRoom) {
      return existingRoom;
    }

    return this.prisma.chatRoom.create({
      data: {
        id: randomUUID(),
        forListing: { connect: { id: listingId } },
        users: {
          connect: [
            { id: requestingUserId },
            { id: listing.userId },
          ],
        },
      },
      include: { users: { select: { id: true, name: true } } },
    });
  }

  async getRoomsForUser(userId: string) {
    return this.prisma.chatRoom.findMany({
      where: { users: { some: { id: userId } } },
      include: {
        users: { select: { id: true, name: true, image: true } },
        forListing: { select: { id: true, title: true } },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getMessageHistory(chatRoomId: string, take = 50) {
    return this.prisma.message.findMany({
      where: { chatRoomId },
      orderBy: { createdAt: 'asc' },
      take,
    });
  }

  async saveMessage(chatRoomId: string, byUserId: string, content: string) {
    return this.prisma.message.create({
      data: {
        id: randomUUID(),
        content,
        byUser: { connect: { id: byUserId } },
        chatRoom: { connect: { id: chatRoomId } },
      },
    });
  }

  async isUserInRoom(chatRoomId: string, userId: string): Promise<boolean> {
    const room = await this.prisma.chatRoom.findFirst({
      where: {
        id: chatRoomId,
        users: { some: { id: userId } },
      },
    });
    return !!room;
  }
}
