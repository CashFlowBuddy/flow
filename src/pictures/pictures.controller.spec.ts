import { BadRequestException } from '@nestjs/common';
import { PicturesController } from './pictures.controller';

jest.mock('@thallesp/nestjs-better-auth', () => ({
  AllowAnonymous: () => () => undefined,
  OptionalAuth: () => () => undefined,
  Session: () => () => undefined,
}));

jest.mock('../prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('PicturesController', () => {
  let controller: PicturesController;
  let service: any;

  beforeEach(() => {
    service = {
      create: jest.fn(),
      findByListing: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    controller = new PicturesController(service);
  });

  it('upload should require listingId', async () => {
    expect(() =>
      controller.upload({ filename: 'x.png' }, '', { user: { id: 'u1' } }),
    ).toThrow(BadRequestException);
  });

  it('upload should require file', async () => {
    expect(() =>
      controller.upload(null, 'l1', { user: { id: 'u1' } }),
    ).toThrow(BadRequestException);
  });

  it('upload should pass dto to service', () => {
    controller.upload({ filename: 'x.png' }, 'l1', { user: { id: 'u1' } });

    expect(service.create).toHaveBeenCalledWith(
      { listingId: 'l1', url: '/uploads/listings/x.png' },
      'u1',
    );
  });

  it('findByListing should pass listing id', () => {
    controller.findByListing('l1');

    expect(service.findByListing).toHaveBeenCalledWith('l1');
  });

  it('remove should pass id and session user', () => {
    controller.remove('p1', { user: { id: 'u1' } });

    expect(service.remove).toHaveBeenCalledWith('p1', 'u1');
  });
});
