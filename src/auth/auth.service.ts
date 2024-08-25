import { Injectable } from '@nestjs/common';
import { UserModel } from '@user/entities/user.entity';
import { UserService } from '@user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login({
    email,
    name,
  }: {
    email: string;
    name: string;
  }): Promise<UserModel> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      const createdUser = this.userService.createUser({
        email,
        name,
      });

      return createdUser;
    }

    return user;
  }
}
