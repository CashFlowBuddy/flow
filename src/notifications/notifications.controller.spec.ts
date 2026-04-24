import { NotificationsController } from './notifications.controller';

jest.mock('@thallesp/nestjs-better-auth', () => ({
  AllowAnonymous: () => () => undefined,
  OptionalAuth: () => () => undefined,
  Session: () => () => undefined,
}));

jest.mock('../prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('NotificationsController', () => {
  it('registerExpoPushToken should forward dto with authenticated user id', () => {
    const notificationsService = {
      registerExpoPushToken: jest.fn(),
    };
    const controller = new NotificationsController(notificationsService as any);

    const dto = { expoPushToken: 'ExponentPushToken[x]', platform: 'ios' as const };
    controller.registerExpoPushToken({ user: { id: 'u1' } }, dto);

    expect(notificationsService.registerExpoPushToken).toHaveBeenCalledWith(
      'u1',
      dto,
    );
  });
});
