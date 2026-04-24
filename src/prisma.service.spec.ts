const prismaClientCtor = jest.fn();
const prismaMariaDbCtor = jest.fn();

jest.mock('../generated/prisma/client', () => ({
  PrismaClient: function PrismaClient(this: any, opts: any) {
    prismaClientCtor(opts);
    this.__opts = opts;
  },
}));

jest.mock('@prisma/adapter-mariadb', () => ({
  PrismaMariaDb: function PrismaMariaDb(this: any, url: string) {
    prismaMariaDbCtor(url);
    this.url = url;
  },
}));

import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  it('should construct PrismaClient using MariaDB adapter from DATABASE_URL', () => {
    process.env.DATABASE_URL = 'mariadb://user:pass@localhost:3306/db';

    const service = new PrismaService();

    expect(service).toBeDefined();
    expect(prismaMariaDbCtor).toHaveBeenCalledWith(process.env.DATABASE_URL);
    expect(prismaClientCtor).toHaveBeenCalledTimes(1);
    const options = prismaClientCtor.mock.calls[0][0];
    expect(options).toHaveProperty('adapter');
  });
});
