import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from 'lib/auth';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ListingsModule } from './listings/listings.module';
import { PicturesModule } from './pictures/pictures.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule.forRoot({ auth }),
    PrismaModule,
    UsersModule,
    ListingsModule,
    PicturesModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
