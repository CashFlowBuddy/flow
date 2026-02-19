import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AllowAnonymous, Session } from '@thallesp/nestjs-better-auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @AllowAnonymous()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('protected')
  getProtected(@Session() session): string {
    return session.user ? `Hello, ${session.user.email}! This is a protected route.` : 'You are not authenticated.';
  }
}
