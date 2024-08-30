import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>
  ) {}

  async createUser(user: Pick<UserModel, 'email' | 'name'>) {
    const createdUser = this.userRepository.create({
      email: user.email,
      name: user.name,
    });

    const newUser = await this.userRepository.save(createdUser);

    return newUser;
  }

  async getAllUsers() {
    const result = await this.userRepository.find();

    return result;
  }

  async getUserByEmail(email: string) {
    const result = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return result;
  }

  async getUserById(userId: number) {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  async getUserLikesByUserId(userId: number) {
    const { likedAuthors, likedOriginalWorks } =
      await this.userRepository.findOne({
        where: {
          id: userId,
        },
        relations: {
          likedAuthors: true,
          likedOriginalWorks: {
            author: true,
          },
        },
      });

    return {
      authors: likedAuthors,
      original_works: likedOriginalWorks,
    };
  }
}
