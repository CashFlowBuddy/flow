import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Session } from '@thallesp/nestjs-better-auth';
import { RegisterExpoPushTokenDto } from './dto/register-expo-push-token.dto';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('expo-push-token')
  @ApiOperation({ summary: 'Register or refresh an Expo push token for the authenticated user' })
  @ApiResponse({ status: 201, description: 'Push token registered' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  registerExpoPushToken(@Session() session, @Body() dto: RegisterExpoPushTokenDto) {
    return this.notificationsService.registerExpoPushToken(session.user.id, dto);
  }
}
