import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OriginalWorkCommentModel } from './entities/original_work_comment.entity';
import { IsNull, Repository } from 'typeorm';
import { LogService } from '@log/log.service';
import { OriginalWorkService } from '@original_work/original_work.service';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';

@Injectable()
export class OriginalWorkCommentService {
  constructor(
    @InjectRepository(OriginalWorkCommentModel)
    private readonly originalWorkCommentRepository: Repository<OriginalWorkCommentModel>,
    private readonly logService: LogService,
    private readonly originalWorkService: OriginalWorkService
  ) {}

  async incrementLikeCount({ commentId }: { commentId: number }) {
    await this.originalWorkCommentRepository.increment(
      { id: commentId },
      'like_count',
      1
    );
  }

  async decrementLikeCount({ commentId }: { commentId: number }) {
    await this.originalWorkCommentRepository.decrement(
      { id: commentId },
      'like_count',
      1
    );
  }

  async incrementCommentCount({ commentId }: { commentId: number }) {
    await this.originalWorkCommentRepository.increment(
      { id: commentId },
      'comment_count',
      1
    );
  }

  async decrementCommentCount({ commentId }: { commentId: number }) {
    await this.originalWorkCommentRepository.decrement(
      { id: commentId },
      'comment_count',
      1
    );
  }

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
  async searchComments({
    originalWorkId,
    dto,
  }: {
    originalWorkId: number;
    dto: PaginateQuery;
  }): Promise<Paginated<OriginalWorkCommentModel>> {
    return await paginate(dto, this.originalWorkCommentRepository, {
      where: {
        original_work_id: originalWorkId,
        target_comment_id: IsNull(),
      },
      sortableColumns: ['id', 'like_count', 'comment_count'],
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: ['comment'],
      relativePath: true,
      relations: ['user', 'liked_users'],
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

    if (targetCommentId == null) {
      await this.originalWorkService.incrementCommentCount({ originalWorkId });
    } else {
      await this.incrementCommentCount({ commentId: targetCommentId });
    }

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
    const comment = await this.originalWorkCommentRepository.findOne({
      where: {
        id: commentId,
      },
    });

    if (comment.target_comment_id == null) {
      await this.originalWorkService.decrementCommentCount({
        originalWorkId: comment.original_work_id,
      });
    } else {
      await this.decrementCommentCount({
        commentId: comment.target_comment_id,
      });
    }

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
        liked_users: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          nickname: true,
        },
      },
    });
  }
}
