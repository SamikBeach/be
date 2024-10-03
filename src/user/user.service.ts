import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ENV_HASH_ROUNDS_KEY } from '@common/const/env-keys.const';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly configService: ConfigService
  ) {}

  async createUser(
    user: Pick<UserModel, 'email' | 'name' | 'password' | 'verification_code'>
  ) {
    const createdUser = this.userRepository.create({
      email: user.email,
      name: user.name,
      password: user.password,
      verification_code: user.verification_code,
    });

    const newUser = await this.userRepository.save(createdUser);

    return newUser;
  }

  async registerUserInfo({
    email,
    name,
    nickname,
    password,
  }: {
    email: string;
    name?: string;
    nickname?: string;
    password: string;
  }) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    const hash = await bcrypt.hash(
      password,
      parseInt(this.configService.get<string>(ENV_HASH_ROUNDS_KEY))
    );

    if (user) {
      await this.userRepository.update(
        {
          email,
        },
        {
          name,
          nickname,
          password: hash,
          verification_code: verificationCode,
        }
      );
    } else {
      const createdUser = this.userRepository.create({
        email,
        name,
        nickname,
        password: hash,
        verification_code: verificationCode,
      });

      await this.userRepository.save(createdUser);
    }
  }

  async updateVerified(email: string, verified: boolean) {
    await this.userRepository.update(
      {
        email,
      },
      {
        verified,
      }
    );
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
            original_works: true,
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
