import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorCommentLikeModel } from './entities/author_comment_like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorCommentLikeService {
  constructor(
    @InjectRepository(AuthorCommentLikeModel)
    private readonly authorCommentLikeRepository: Repository<AuthorCommentLikeModel>
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
