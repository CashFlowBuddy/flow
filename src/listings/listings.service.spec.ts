import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ListingsService } from './listings.service';

jest.mock('../prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('ListingsService', () => {
  let service: ListingsService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      listing: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    service = new ListingsService(prisma);
  });

  it('create should persist listing with generated url and owner', async () => {
    prisma.listing.create.mockResolvedValue({ id: 'l1' });

    const result = await service.create(
      {
        title: 'My New Listing',
        description: 'desc',
        category: 'ELECTRONICS' as any,
        price: 100,
      },
      'u1',
    );

    expect(result).toEqual({ id: 'l1' });
    expect(prisma.listing.create).toHaveBeenCalledTimes(1);
    expect(prisma.listing.create.mock.calls[0][0].data.userId).toBe('u1');
    expect(prisma.listing.create.mock.calls[0][0].data.url).toContain('my-new-listing-');
  });

  it('findAllAdmin should throw for non-admin', async () => {
    await expect(service.findAllAdmin(undefined, false)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('findOne should throw when listing does not exist', async () => {
    prisma.listing.findFirst.mockResolvedValue(null);

    await expect(service.findOne('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('findOne should compute isSaved for authenticated users', async () => {
    prisma.listing.findFirst.mockResolvedValue({
      id: 'l1',
      title: 'x',
      savedBy: [{ id: 'u1' }],
    });

    const result = await service.findOne('l1', 'u1');

    expect(result).toEqual({ id: 'l1', title: 'x', isSaved: true });
  });

  it('update should throw for missing listing', async () => {
    prisma.listing.findUnique.mockResolvedValue(null);

    await expect(
      service.update('l1', { title: 'new' }, 'u1'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('update should throw for non-owner non-admin', async () => {
    prisma.listing.findUnique.mockResolvedValue({
      id: 'l1',
      userId: 'owner',
      status: 'AVAILABLE',
      price: 100,
    });

    await expect(
      service.update('l1', { title: 'new' }, 'u1', false),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('update should set discountedPrice when new price is lower', async () => {
    prisma.listing.findUnique.mockResolvedValue({
      id: 'l1',
      userId: 'u1',
      status: 'AVAILABLE',
      price: 100,
    });
    prisma.listing.update.mockResolvedValue({ id: 'l1', discountedPrice: 80 });

    const result = await service.update('l1', { price: 80 }, 'u1', false);

    expect(result).toEqual({ id: 'l1', discountedPrice: 80 });
    expect(prisma.listing.update.mock.calls[0][0].data.discountedPrice).toBe(80);
  });

  it('remove should throw for non-owner non-admin', async () => {
    prisma.listing.findUnique.mockResolvedValue({ id: 'l1', userId: 'owner' });

    await expect(service.remove('l1', 'u1', false)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('save should throw when listing does not exist', async () => {
    prisma.listing.findFirst.mockResolvedValue(null);

    await expect(service.save('unknown', 'u1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('unsave should disconnect user when listing exists', async () => {
    prisma.listing.findFirst.mockResolvedValue({ id: 'l1' });
    prisma.listing.update.mockResolvedValue({ id: 'l1' });

    const result = await service.unsave('l1', 'u1');

    expect(result).toEqual({ id: 'l1' });
    expect(prisma.listing.update).toHaveBeenCalledWith({
      where: { id: 'l1' },
      data: { savedBy: { disconnect: { id: 'u1' } } },
    });
  });
});
