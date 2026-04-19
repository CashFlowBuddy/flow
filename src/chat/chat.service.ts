import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
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
      include: {
        users: { select: { id: true, name: true, image: true } },
        forListing: { select: { id: true, title: true, url: true } },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (existingRoom) {
      return { room: existingRoom, existed: true };
    }

    const room = await this.prisma.chatRoom.create({
      data: {
        id: randomUUID(),
        forListingId: listingId,
        users: {
          connect: [
            { id: requestingUserId },
            { id: listing.userId },
          ],
        },
      },
      include: {
        users: { select: { id: true, name: true, image: true } },
        forListing: { select: { id: true, title: true, url: true } },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    return { room, existed: false };
  }

  async getRoomsForUser(userId: string) {
    const rooms = await this.prisma.chatRoom.findMany({
      where: { users: { some: { id: userId } } },
      include: {
        users: { select: { id: true, name: true, image: true } },
        forListing: { select: { id: true, title: true, url: true } },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    return rooms.sort((a, b) => {
      const aDate = a.messages[0]?.createdAt ?? new Date(0);
      const bDate = b.messages[0]?.createdAt ?? new Date(0);
      return bDate.getTime() - aDate.getTime();
    });
  }

  async getMessageHistory(chatRoomId: string, userId: string, take   = 50) {
    const isUserInRoom = await this.isUserInRoom(chatRoomId, userId);
    if (!isUserInRoom) {
      throw new ForbiddenException('You are not a participant in this chat room');
    }

    return this.prisma.message.findMany({
      select: {
        byUserId: true,
        content: true,
        createdAt: true,
      },
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
        byUserId,
        chatRoomId,
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
