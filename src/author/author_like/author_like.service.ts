import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorLikeModel } from './entities/author_like.entity';

@Injectable()
export class AuthorLikeService {
  constructor(
    @InjectRepository(AuthorLikeModel)
    private readonly authorLikeRepository: Repository<AuthorLikeModel>
  ) {}

  async addLike({ authorId, userId }: { authorId: number; userId: number }) {
    const created = this.authorLikeRepository.create({
      user_id: userId,
      author_id: authorId,
    });

    const newAuthorLike = await this.authorLikeRepository.save(created);

    return newAuthorLike;
  }

  async removeLike({ authorId, userId }: { authorId: number; userId: number }) {
    const deleted = await this.authorLikeRepository.delete({
      user_id: userId,
      author_id: authorId,
    });

    return deleted;
  }

  async findLike({ authorId, userId }: { authorId: number; userId: number }) {
    const isExist = await this.authorLikeRepository.exists({
      where: {
        user_id: userId,
        author_id: authorId,
      },
    });

    return { isExist };
  }

  async findAllLikes(authorId: number) {
    const likes = await this.authorLikeRepository.find({
      where: {
        author_id: authorId,
      },
    });

    return { count: likes.length };
  }
}
