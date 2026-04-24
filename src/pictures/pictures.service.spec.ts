import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PicturesService } from './pictures.service';

jest.mock('../prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('PicturesService', () => {
  let service: PicturesService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      listing: {
        findUnique: jest.fn(),
      },
      picture: {
        count: jest.fn(),
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        delete: jest.fn(),
      },
    };

    service = new PicturesService(prisma);
  });

  it('create should throw when listing is missing', async () => {
    prisma.listing.findUnique.mockResolvedValue(null);

    await expect(
      service.create({ listingId: 'l1', url: '/uploads/x.png' }, 'u1'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('create should throw when user is not owner', async () => {
    prisma.listing.findUnique.mockResolvedValue({ id: 'l1', userId: 'owner' });

    await expect(
      service.create({ listingId: 'l1', url: '/uploads/x.png' }, 'u1'),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('create should throw when listing already has 6 pictures', async () => {
    prisma.listing.findUnique.mockResolvedValue({ id: 'l1', userId: 'u1' });
    prisma.picture.count.mockResolvedValue(6);

    await expect(
      service.create({ listingId: 'l1', url: '/uploads/x.png' }, 'u1'),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('findOne should throw when picture does not exist', async () => {
    prisma.picture.findUnique.mockResolvedValue(null);

    await expect(service.findOne('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('remove should throw when picture does not exist', async () => {
    prisma.picture.findUnique.mockResolvedValue(null);

    await expect(service.remove('p1', 'u1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('remove should throw when user is not listing owner', async () => {
    prisma.picture.findUnique.mockResolvedValue({
      id: 'p1',
      url: '/uploads/listings/x.png',
      listing: { userId: 'owner' },
    });

    await expect(service.remove('p1', 'u1')).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('remove should delete and return picture when user is owner', async () => {
    prisma.picture.findUnique.mockResolvedValue({
      id: 'p1',
      url: 'https://cdn/p1.png',
      listing: { userId: 'u1' },
    });
    prisma.picture.delete.mockResolvedValue({ id: 'p1' });

    const result = await service.remove('p1', 'u1');

    expect(result).toEqual({ id: 'p1' });
    expect(prisma.picture.delete).toHaveBeenCalledWith({ where: { id: 'p1' } });
  });
});
