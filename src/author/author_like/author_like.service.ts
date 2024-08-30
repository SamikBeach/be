import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorLikeModel } from './entities/author_like.entity';
import { LogService } from '@log/log.service';

@Injectable()
export class AuthorLikeService {
  constructor(
    @InjectRepository(AuthorLikeModel)
    private readonly authorLikeRepository: Repository<AuthorLikeModel>,
    private readonly logService: LogService
  ) {}

  async addLike({ authorId, userId }: { authorId: number; userId: number }) {
    const created = this.authorLikeRepository.create({
      user_id: userId,
      author_id: authorId,
    });

    const newAuthorLike = await this.authorLikeRepository.save(created);

    await this.logService.createLog({
      user_id: userId,
      target_author_id: authorId,
    });

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

  async getLikeCountByAuthorId(authorId: number) {
    const likes = await this.authorLikeRepository.find({
      where: {
        author_id: authorId,
      },
    });

    return { count: likes.length };
  }
}
