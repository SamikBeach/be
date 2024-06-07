import { PickType } from '@nestjs/mapped-types';
import { UserModel } from 'src/user/entities/user.entity';

export class RegisterUserDto extends PickType(UserModel, [
  'email',
  'password',
]) {}
