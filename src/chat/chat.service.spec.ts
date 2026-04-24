import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ChatService } from './chat.service';

jest.mock('../prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('ChatService', () => {
  let service: ChatService;
  let prisma: any;
  let notificationsService: any;

  beforeEach(() => {
    prisma = {
      listing: {
        findUnique: jest.fn(),
      },
      chatRoom: {
        findFirst: jest.fn(),
        create: jest.fn(),
        findMany: jest.fn(),
      },
      message: {
        findMany: jest.fn(),
        create: jest.fn(),
      },
    };

    notificationsService = {
      notifyNewMessageRecipients: jest.fn(),
    };

    service = new ChatService(prisma, notificationsService);
  });

  it('createRoom should throw when listing does not exist', async () => {
    prisma.listing.findUnique.mockResolvedValue(null);

    await expect(service.createRoom('l1', 'u1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('createRoom should throw when user tries own listing', async () => {
    prisma.listing.findUnique.mockResolvedValue({ id: 'l1', userId: 'u1' });

    await expect(service.createRoom('l1', 'u1')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('createRoom should return existing room when found', async () => {
    prisma.listing.findUnique.mockResolvedValue({ id: 'l1', userId: 'owner' });
    prisma.chatRoom.findFirst.mockResolvedValue({ id: 'room-1' });

    const result = await service.createRoom('l1', 'u1');

    expect(result).toEqual({ room: { id: 'room-1' }, existed: true });
  });

  it('getRoomsForUser should sort by latest message desc', async () => {
    prisma.chatRoom.findMany.mockResolvedValue([
      { id: 'r1', messages: [{ createdAt: new Date('2024-01-01') }] },
      { id: 'r2', messages: [{ createdAt: new Date('2025-01-01') }] },
    ]);

    const result = await service.getRoomsForUser('u1');

    expect(result.map((room: any) => room.id)).toEqual(['r2', 'r1']);
  });

  it('getMessageHistory should throw when user is not in room', async () => {
    jest.spyOn(service, 'isUserInRoom').mockResolvedValue(false);

    await expect(service.getMessageHistory('room-1', 'u1')).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('saveMessage should persist and trigger async notification', async () => {
    prisma.message.create.mockResolvedValue({ id: 'm1' });

    const result = await service.saveMessage('room-1', 'u1', 'hello');

    expect(result).toEqual({ id: 'm1' });
    expect(notificationsService.notifyNewMessageRecipients).toHaveBeenCalledWith(
      'room-1',
      'u1',
      'hello',
    );
  });

  it('isUserInRoom should return false when query misses room', async () => {
    prisma.chatRoom.findFirst.mockResolvedValue(null);

    await expect(service.isUserInRoom('room-1', 'u1')).resolves.toBe(false);
  });
});
