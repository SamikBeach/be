import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorCommentModel } from './entities/author_comment.entity';
import { Repository } from 'typeorm';
import { LogService } from '@log/log.service';

@Injectable()
export class AuthorCommentService {
  constructor(
    @InjectRepository(AuthorCommentModel)
    private readonly authorCommentRepository: Repository<AuthorCommentModel>,
    private readonly logService: LogService
  ) {}

  async getAllComments(authorId: number) {
    return await this.authorCommentRepository.find({
      where: {
        author_id: authorId,
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          name: true,
        },
      },
    });
  }

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
      user: {
        id: userId,
      },
      comment: comment,
      target_comment_id: targetCommentId,
      target_user_id: targetUserId,
    });

    const newAuthorComment = await this.authorCommentRepository.save(created);

    await this.logService.createLog({
      user_id: userId,
      target_author_id: authorId,
      comment_id: newAuthorComment.id,
    });

    return newAuthorComment;
  }

  async updateComment({
    commentId,
    comment,
  }: {
    commentId: number;
    comment: string;
  }) {
    const updated = await this.authorCommentRepository.update(
      {
        id: commentId,
      },
      {
        comment,
      }
    );

    return updated;
  }

  async deleteComment({ commentId }: { commentId: number }) {
    const deleted = await this.authorCommentRepository.delete({
      id: commentId,
    });

    return deleted;
  }

  async getSubCommentsByCommentById(commentId: number) {
    return await this.authorCommentRepository.find({
      where: {
        target_comment_id: commentId,
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          name: true,
        },
      },
    });
  }
}
