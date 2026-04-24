import { ListingsController } from './listings.controller';

jest.mock('@thallesp/nestjs-better-auth', () => ({
  AllowAnonymous: () => () => undefined,
  OptionalAuth: () => () => undefined,
  Session: () => () => undefined,
}));

jest.mock('../prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

describe('ListingsController', () => {
  let controller: ListingsController;
  let service: any;

  beforeEach(() => {
    service = {
      create: jest.fn(),
      findAll: jest.fn(),
      findAllAdmin: jest.fn(),
      findSaved: jest.fn(),
      findByUser: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      save: jest.fn(),
      unsave: jest.fn(),
    };

    controller = new ListingsController(service);
  });

  it('create should call service with dto and session user id', () => {
    const dto = { title: 'x' } as any;
    controller.create(dto, { user: { id: 'u1' } });

    expect(service.create).toHaveBeenCalledWith(dto, 'u1');
  });

  it('findAll should pass query params', () => {
    controller.findAll('CARS', 'bmw');

    expect(service.findAll).toHaveBeenCalledWith('CARS', 'bmw');
  });

  it('findAllAdmin should infer admin flag from session', () => {
    controller.findAllAdmin('PENDING', { user: { role: 'ADMIN' } });

    expect(service.findAllAdmin).toHaveBeenCalledWith('PENDING', true);
  });

  it('findOne should work with optional session', () => {
    controller.findOne('l1');

    expect(service.findOne).toHaveBeenCalledWith('l1', undefined);
  });

  it('update should pass admin status and user id', () => {
    const dto = { title: 'new' } as any;
    controller.update('l1', dto, { user: { id: 'u1', role: 'ADMIN' } });

    expect(service.update).toHaveBeenCalledWith('l1', dto, 'u1', true);
  });

  it('unsave should pass listing and user id', () => {
    controller.unsave('l1', { user: { id: 'u1' } });

    expect(service.unsave).toHaveBeenCalledWith('l1', 'u1');
  });
});
