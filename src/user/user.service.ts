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
    const { liked_authors, liked_original_works, liked_editions } =
      await this.userRepository.findOne({
        where: {
          id: userId,
        },
        relations: {
          liked_authors: true,
          liked_original_works: {
            author: true,
          },
          liked_editions: {
            author: true,
          },
        },
      });

    return {
      authors: liked_authors,
      original_works: liked_original_works,
      editions: liked_editions,
    };
  }

  async getUserCommentsByUserId(userId: number) {
    const { commented_authors, commented_original_works, commented_editions } =
      await this.userRepository.findOne({
        where: {
          id: userId,
        },
        relations: {
          commented_authors: true,
          commented_original_works: {
            author: true,
          },
          commented_editions: {
            author: true,
          },
        },
      });

    return {
      authors: commented_authors,
      original_works: commented_original_works,
      editions: commented_editions,
    };
  }
}
