import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

jest.mock('../prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

jest.mock('fs', () => ({
  promises: {
    unlink: jest.fn(),
  },
}));

describe('UsersService', () => {
  let service: UsersService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      user: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    service = new UsersService(prisma);
  });

  it('findAll should call prisma with expected select', async () => {
    prisma.user.findMany.mockResolvedValue([{ id: 'u1' }]);

    const result = await service.findAll();

    expect(result).toEqual([{ id: 'u1' }]);
    expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
  });

  it('findOne should throw when user does not exist', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(service.findOne('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('findMe should return user data when found', async () => {
    const user = { id: 'u1', listings: [], savedListings: [] };
    prisma.user.findUnique.mockResolvedValue(user);

    const result = await service.findMe('u1');

    expect(result).toEqual(user);
  });

  it('update should block non-owner non-admin updates', async () => {
    prisma.user.findUnique.mockResolvedValue({ role: 'USER' });

    await expect(
      service.update('u2', { name: 'new' }, 'u1'),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('update should block role changes by non-admin', async () => {
    prisma.user.findUnique.mockResolvedValue({ role: 'USER' });

    await expect(
      service.update('u1', { role: 'ADMIN' as any }, 'u1'),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('update should allow admins to update other users', async () => {
    prisma.user.findUnique.mockResolvedValue({ role: 'ADMIN' });
    prisma.user.update.mockResolvedValue({ id: 'u2', name: 'updated' });

    const result = await service.update('u2', { name: 'updated' }, 'admin');

    expect(result).toEqual({ id: 'u2', name: 'updated' });
    expect(prisma.user.update).toHaveBeenCalledTimes(1);
  });

  it('uploadAvatar should block updates for another user', async () => {
    await expect(
      service.uploadAvatar('u2', 'u1', '/uploads/avatars/new.png'),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('uploadAvatar should throw when target user is missing', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(
      service.uploadAvatar('u1', 'u1', '/uploads/avatars/new.png'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('uploadAvatar should update avatar when user exists', async () => {
    prisma.user.findUnique.mockResolvedValue({ image: null });
    prisma.user.update.mockResolvedValue({ id: 'u1', image: '/new.png' });

    const result = await service.uploadAvatar(
      'u1',
      'u1',
      '/uploads/avatars/new.png',
    );

    expect(result).toEqual({ id: 'u1', image: '/new.png' });
  });

  it('remove should block non-owner non-admin delete', async () => {
    prisma.user.findUnique.mockResolvedValue({ role: 'USER' });

    await expect(service.remove('u2', 'u1')).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('remove should allow owner delete', async () => {
    prisma.user.findUnique.mockResolvedValue({ role: 'USER' });
    prisma.user.delete.mockResolvedValue({ id: 'u1' });

    const result = await service.remove('u1', 'u1');

    expect(result).toEqual({ id: 'u1' });
  });
});
