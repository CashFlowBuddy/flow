import { Controller, Get, Patch, Param, Delete, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AllowAnonymous, Session } from '@thallesp/nestjs-better-auth';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @AllowAnonymous()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  findMe(@Session() session) {
    return this.usersService.findMe(session.user.id);
  }

  @AllowAnonymous()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto, @Session() session) {
    return this.usersService.update(id, dto, session.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Session() session) {
    return this.usersService.remove(id, session.user.id);
  }
}
