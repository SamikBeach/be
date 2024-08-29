import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OriginalWorkCommentModel } from './entities/original_work_comment.entity';
import { Repository } from 'typeorm';
import { LogService } from '@log/log.service';

@Injectable()
export class OriginalWorkCommentService {
  constructor(
    @InjectRepository(OriginalWorkCommentModel)
    private readonly originalWorkCommentRepository: Repository<OriginalWorkCommentModel>,
    private readonly logService: LogService
  ) {}

  async getAllComments(originalWorkId: number) {
    return await this.originalWorkCommentRepository.find({
      where: {
        original_work_id: originalWorkId,
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
    originalWorkId,
    userId,
    comment,
    targetCommentId,
    targetUserId,
  }: {
    originalWorkId: number;
    userId: number;
    comment: string;
    targetCommentId: number;
    targetUserId: number;
  }) {
    const created = this.originalWorkCommentRepository.create({
      original_work_id: originalWorkId,
      user: {
        id: userId,
      },
      comment: comment,
      target_comment_id: targetCommentId,
      target_user_id: targetUserId,
    });

    const newOriginalWorkComment =
      await this.originalWorkCommentRepository.save(created);

    await this.logService.createLog({
      user_id: userId,
      target_original_work_id: originalWorkId,
      original_work_comment_id: newOriginalWorkComment.id,
    });

    return newOriginalWorkComment;
  }

  async updateComment({
    commentId,
    comment,
  }: {
    commentId: number;
    comment: string;
  }) {
    const updated = await this.originalWorkCommentRepository.update(
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
    const deleted = await this.originalWorkCommentRepository.delete({
      id: commentId,
    });

    return deleted;
  }

  async getSubCommentsByCommentById(commentId: number) {
    return await this.originalWorkCommentRepository.find({
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
