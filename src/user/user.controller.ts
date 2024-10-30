import { Controller, Get, Body, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { IsPublic } from '@common/decorator/is-public.decorator';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { AuthService } from '@auth/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiBearerAuth()
@ApiTags('user')
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

  @Get('search')
  @IsPublic()
  searchUser(@Paginate('search') query: PaginateQuery) {
    return this.userService.searchUser(query);
  }

  @Get('my')
  async getMyUserInfo(@Req() req: Request) {
    const tokenWithPrefix = req.headers['authorization'];

    const token = this.authService.extractTokenFromHeader({
      tokenWithPrefix,
      isBearer: true,
    });

    const { email } = await this.authService.verifyToken({ token });

    const user = await this.getUserByEmail(email);

    return {
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      email: user.email,
    };
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
