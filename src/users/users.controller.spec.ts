import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { UsersController } from './users.controller';

jest.mock(
  'generated/prisma/enums',
  () => ({
    Role: {
      ADMIN: 'ADMIN',
      USER: 'USER',
    },
  }),
  { virtual: true },
);

jest.mock('@thallesp/nestjs-better-auth', () => ({
  AllowAnonymous: () => () => undefined,
  OptionalAuth: () => () => undefined,
  Session: () => () => undefined,
}));

jest.mock('../prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: any;

  beforeEach(() => {
    usersService = {
      findAll: jest.fn(),
      findMe: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      uploadAvatar: jest.fn(),
      remove: jest.fn(),
    };

    controller = new UsersController(usersService);
  });

  it('findAll should block non-admin users', () => {
    expect(() => controller.findAll({ user: { role: 'USER' } })).toThrow(
      ForbiddenException,
    );
  });

  it('findAll should return users for admins', async () => {
    usersService.findAll.mockResolvedValue([{ id: 'u1' }]);

    const result = await controller.findAll({ user: { role: 'ADMIN' } });

    expect(result).toEqual([{ id: 'u1' }]);
  });

  it('findMe should delegate with session user id', () => {
    controller.findMe({ user: { id: 'u1' } });

    expect(usersService.findMe).toHaveBeenCalledWith('u1');
  });

  it('uploadAvatar should require file', () => {
    expect(() =>
      controller.uploadAvatar('u1', null, { user: { id: 'u1' } }),
    ).toThrow(BadRequestException);
  });

  it('removeAdmin should block non-admin users', () => {
    expect(() =>
      controller.removeAdmin('u1', { user: { role: 'USER', id: 'u2' } }),
    ).toThrow(ForbiddenException);
  });

  it('remove should pass session user id', () => {
    controller.remove('u1', { user: { id: 'u1' } });

    expect(usersService.remove).toHaveBeenCalledWith('u1', 'u1');
  });
});
