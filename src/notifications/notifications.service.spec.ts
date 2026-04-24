import { ForbiddenException } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

jest.mock('../prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('NotificationsService', () => {
  let service: NotificationsService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      expoPushToken: {
        upsert: jest.fn(),
        findMany: jest.fn(),
        updateMany: jest.fn(),
      },
      chatRoom: {
        findUnique: jest.fn(),
      },
    };

    service = new NotificationsService(prisma);
    jest.restoreAllMocks();
  });

  it('registerExpoPushToken should reject registering for another user', async () => {
    await expect(
      service.registerExpoPushToken('session-user', {
        userId: 'another-user',
        expoPushToken: 'ExponentPushToken[test]',
        platform: 'ios',
      }),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('registerExpoPushToken should upsert token for authenticated user', async () => {
    prisma.expoPushToken.upsert.mockResolvedValue({ id: 'token-1' });

    const result = await service.registerExpoPushToken('u1', {
      expoPushToken: 'ExponentPushToken[test]',
      platform: 'android',
    });

    expect(result).toEqual({ id: 'token-1' });
    expect(prisma.expoPushToken.upsert).toHaveBeenCalledTimes(1);
  });

  it('notifyNewMessageRecipients should return early when no recipients exist', async () => {
    prisma.chatRoom.findUnique.mockResolvedValue({ users: [] });

    const fetchSpy = jest
      .spyOn(global, 'fetch' as any)
      .mockResolvedValue({ ok: true } as any);

    await service.notifyNewMessageRecipients('room-1', 'sender-1', 'hello');

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('notifyNewMessageRecipients should disable invalid expo tokens', async () => {
    prisma.chatRoom.findUnique.mockResolvedValue({
      users: [{ id: 'u2' }],
    });
    prisma.expoPushToken.findMany.mockResolvedValue([
      { id: 't1', expoPushToken: 'ExponentPushToken[1]' },
      { id: 't2', expoPushToken: 'ExponentPushToken[2]' },
    ]);

    jest.spyOn(global, 'fetch' as any).mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          { status: 'ok' },
          {
            status: 'error',
            details: { error: 'DeviceNotRegistered' },
          },
        ],
      }),
    } as any);

    await service.notifyNewMessageRecipients('room-1', 'sender-1', 'hello');

    expect(prisma.expoPushToken.updateMany).toHaveBeenCalledWith({
      where: { id: { in: ['t2'] } },
      data: { active: false },
    });
  });

  it('notifyNewMessageRecipients should log warning on non-ok response', async () => {
    prisma.chatRoom.findUnique.mockResolvedValue({ users: [{ id: 'u2' }] });
    prisma.expoPushToken.findMany.mockResolvedValue([
      { id: 't1', expoPushToken: 'ExponentPushToken[1]' },
    ]);

    const warnSpy = jest.spyOn((service as any).logger, 'warn');
    jest.spyOn(global, 'fetch' as any).mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => 'server error',
    } as any);

    await service.notifyNewMessageRecipients('room-1', 'sender-1', 'hello');

    expect(warnSpy).toHaveBeenCalled();
  });
});
