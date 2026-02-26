import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AllowAnonymous, Session } from '@thallesp/nestjs-better-auth';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @AllowAnonymous()
  @Get()
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'Returns hello message' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('protected')
  @ApiOperation({ summary: 'Protected route' })
  @ApiResponse({ status: 200, description: 'Returns greeting for authenticated user' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProtected(@Session() session): string {
    return session.user ? `Hello, ${session.user.email}! This is a protected route.` : 'You are not authenticated.';
  }
}
