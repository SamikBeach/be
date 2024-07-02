import { PickType } from '@nestjs/mapped-types';
import { UserModel } from '@user/entities/user.entity';

export class RegisterUserDto extends PickType(UserModel, [
  'email',
  'password',
]) {}
