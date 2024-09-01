import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorCommentLikeModel } from './entities/author_comment_like.entity';
import { Repository } from 'typeorm';
import { AuthorCommentService } from '@author/author_comment/author_comment.service';

@Injectable()
export class AuthorCommentLikeService {
  constructor(
    @InjectRepository(AuthorCommentLikeModel)
    private readonly authorCommentLikeRepository: Repository<AuthorCommentLikeModel>,
    private readonly authorCommentService: AuthorCommentService
  ) {}

  async addLike({
    authorCommentId,
    userId,
  }: {
    authorCommentId: number;
    userId: number;
  }) {
    const created = this.authorCommentLikeRepository.create({
      user_id: userId,
      author_comment_id: authorCommentId,
    });

    const newAuthorLike = await this.authorCommentLikeRepository.save(created);

    await this.authorCommentService.incrementLikeCount({
      commentId: authorCommentId,
    });

    return newAuthorLike;
  }

  async removeLike({
    authorCommentId,
    userId,
  }: {
    authorCommentId: number;
    userId: number;
  }) {
    const deleted = await this.authorCommentLikeRepository.delete({
      user_id: userId,
      author_comment_id: authorCommentId,
    });

    await this.authorCommentService.decrementLikeCount({
      commentId: authorCommentId,
    });

    return deleted;
  }

  async findLike({
    authorCommentId,
    userId,
  }: {
    authorCommentId: number;
    userId: number;
  }) {
    const isExist = await this.authorCommentLikeRepository.exists({
      where: {
        user_id: userId,
        author_comment_id: authorCommentId,
      },
    });

    return { isExist };
  }

  async findAllLikes(authorCommentId: number) {
    const likes = await this.authorCommentLikeRepository.find({
      where: {
        author_comment_id: authorCommentId,
      },
    });

    return { count: likes.length };
  }
}
