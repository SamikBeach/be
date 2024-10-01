import { Controller, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessTokenGuard } from '@auth/guard/bearer-token.guard';
import { AuthService } from '@auth/auth.service';
import { IsPublic } from '@common/decorator/is-public.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('email')
  getUserByEmail(@Body('email') email: string) {
    const result = this.userService.getUserByEmail(email);

    return result;
  }

  @Get('my')
  @UseGuards(AccessTokenGuard)
  async getMyUserInfo(@Req() req: Request) {
    const tokenWithPrefix = req.headers['authorization'];

    const token = this.authService.extractTokenFromHeader({
      tokenWithPrefix,
      isBearer: true,
    });

    const { email } = await this.authService.verifyToken(token);

    const user = await this.getUserByEmail(email);

    return { id: user.id, name: user.name, email: user.email };
  }

  @Get(':userId')
  @IsPublic()
  getUserById(@Param('userId') userId: number) {
    return this.userService.getUserById(userId);
  }

  @Get(':userId/like')
  @IsPublic()
  getUserLikesByUserId(@Param('userId') userId: number) {
    return this.userService.getUserLikesByUserId(userId);
  }

  @Get(':userId/comment')
  @IsPublic()
  getUserCommentsByUserId(@Param('userId') userId: number) {
    return this.userService.getUserCommentsByUserId(userId);
  }
}
