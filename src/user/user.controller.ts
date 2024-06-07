import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('email')
  getUserByEmail(@Body('email') email: string) {
    const result = this.userService.getUserByEmail(email);

    return result;
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: number) {
    return this.userService.getUserById(userId);
  }
}
