import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OriginalWorkCommentModel } from './entities/original_work_comment.entity';
import { IsNull, Repository } from 'typeorm';
import { LogService } from '@log/log.service';
import { CommonService } from '@common/common.service';
import { SearchAuthorCommentsDto } from '@author/author_comment/dto/search-comment.dto';
import { OriginalWorkService } from '@original_work/original_work.service';

@Injectable()
export class OriginalWorkCommentService {
  constructor(
    @InjectRepository(OriginalWorkCommentModel)
    private readonly originalWorkCommentRepository: Repository<OriginalWorkCommentModel>,
    private readonly commonService: CommonService,
    private readonly logService: LogService,
    private readonly originalWorkService: OriginalWorkService
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

  async searchComments({
    originalWorkId,
    dto,
  }: {
    originalWorkId: number;
    dto: SearchAuthorCommentsDto;
  }) {
    return this.commonService.paginate(
      dto,
      this.originalWorkCommentRepository,
      {
        where: {
          original_work_id: originalWorkId,
          target_comment_id: IsNull(),
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
        order: {
          created_at: dto.sort === 'latest' ? 'DESC' : 'ASC',
        },
      },
      'original-work-comment/search'
    );
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
    const deleted = await this.originalWorkCommentRepository.delete({
      id: commentId,
    });

    const comment = await this.originalWorkCommentRepository.findOne({
      where: {
        id: commentId,
      },
    });

    if (comment.target_comment_id == null) {
      await this.originalWorkService.decrementCommentCount({
        originalWorkId: comment.original_work_id,
      });
    }

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
