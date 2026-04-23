import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { DevicePlatform } from '../../generated/prisma/enums';
import { PrismaService } from '../prisma.service';
import { RegisterExpoPushTokenDto } from './dto/register-expo-push-token.dto';
import { randomUUID } from 'crypto';

type ExpoPushResponse = {
  data?: Array<{
    status: 'ok' | 'error';
    details?: { error?: string };
  }>;
};

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private readonly expoPushUrl = 'https://exp.host/--/api/v2/push/send';

  constructor(private readonly prisma: PrismaService) {}

  async registerExpoPushToken(sessionUserId: string, dto: RegisterExpoPushTokenDto) {
    const targetUserId = dto.userId ?? sessionUserId;
    if (targetUserId !== sessionUserId) {
      throw new ForbiddenException('You can only register push tokens for yourself');
    }

    const platform = this.toPlatformEnum(dto.platform);

    const token = await this.prisma.expoPushToken.upsert({
      where: {
        userId_expoPushToken: {
          userId: targetUserId,
          expoPushToken: dto.expoPushToken,
        },
      },
      create: {
        id: randomUUID(),
        userId: targetUserId,
        expoPushToken: dto.expoPushToken,
        platform,
        active: true,
        lastSeenAt: new Date(),
      },
      update: {
        platform,
        active: true,
        lastSeenAt: new Date(),
      },
      select: {
        id: true,
        userId: true,
        expoPushToken: true,
        platform: true,
        active: true,
        createdAt: true,
        updatedAt: true,
        lastSeenAt: true,
      },
    });

    return token;
  }

  async notifyNewMessageRecipients(chatRoomId: string, senderUserId: string, content: string) {
    try {
      const room = await this.prisma.chatRoom.findUnique({
        where: { id: chatRoomId },
        select: {
          users: {
            where: { id: { not: senderUserId } },
            select: { id: true },
          },
        },
      });

      const recipientIds = room?.users.map((user) => user.id) ?? [];
      if (recipientIds.length === 0) {
        return;
      }

      const recipientTokens = await this.prisma.expoPushToken.findMany({
        where: {
          userId: { in: recipientIds },
          active: true,
        },
        select: {
          id: true,
          expoPushToken: true,
        },
      });

      if (recipientTokens.length === 0) {
        return;
      }

      const messages = recipientTokens.map((token) => ({
        to: token.expoPushToken,
        sound: 'default',
        title: 'New message',
        body: content.slice(0, 160),
        data: { chatRoomId },
      }));

      const response = await fetch(this.expoPushUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messages),
      });

      if (!response.ok) {
        const responseText = await response.text();
        this.logger.warn(`Expo push API error: ${response.status} ${responseText}`);
        return;
      }

      const payload = (await response.json()) as ExpoPushResponse;
      const invalidTokenIds = (payload.data ?? [])
        .map((item, index) => {
          if (item.status !== 'error') {
            return null;
          }

          if (item.details?.error === 'DeviceNotRegistered') {
            return recipientTokens[index]?.id ?? null;
          }

          return null;
        })
        .filter((id): id is string => Boolean(id));

      if (invalidTokenIds.length > 0) {
        await this.prisma.expoPushToken.updateMany({
          where: { id: { in: invalidTokenIds } },
          data: { active: false },
        });
      }
    } catch (error) {
      this.logger.warn('Failed to send chat push notifications', error as Error);
    }
  }

  private toPlatformEnum(platform: 'ios' | 'android'): DevicePlatform {
    return platform === 'ios' ? DevicePlatform.IOS : DevicePlatform.ANDROID;
  }
}
