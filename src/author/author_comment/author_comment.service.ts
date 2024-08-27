import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorCommentModel } from './entities/author_comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorCommentService {
  constructor(
    @InjectRepository(AuthorCommentModel)
    private readonly authorCommentRepository: Repository<AuthorCommentModel>
  ) {}

  async addComment({
    authorId,
    userId,
    comment,
    targetCommentId,
    targetUserId,
  }: {
    authorId: number;
    userId: number;
    comment: string;
    targetCommentId: number;
    targetUserId: number;
  }) {
    const created = this.authorCommentRepository.create({
      author_id: authorId,
      user_id: userId,
      comment: comment,
      target_comment_id: targetCommentId,
      target_user_id: targetUserId,
    });

    const newAuthorComment = await this.authorCommentRepository.save(created);

    return newAuthorComment;
  }

  async updateComment({
    authorId,
    commentId,
    comment,
  }: {
    authorId: number;
    commentId: number;
    comment: string;
  }) {
    const updated = await this.authorCommentRepository.update(
      {
        author_id: authorId,
        id: commentId,
      },
      {
        comment,
      }
    );

    return updated;
  }
}
