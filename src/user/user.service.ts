import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>
  ) {}

  async createUser(user: Pick<UserModel, 'email' | 'password'>) {
    const isEmailExists = await this.userRepository.exists({
      where: {
        email: user.email,
      },
    });

    if (isEmailExists) {
      throw new BadRequestException('이미 가입한 이메일입니다.');
    }

    const createdUser = this.userRepository.create({
      email: user.email,
      password: user.password,
    });

    const newUser = await this.userRepository.save(createdUser);

    return newUser;
  }

  async getAllUsers() {
    const result = await this.userRepository.find();

    return result;
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
