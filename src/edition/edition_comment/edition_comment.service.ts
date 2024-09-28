import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EditionCommentModel } from './entities/edition_comment.entity';
import { IsNull, Repository } from 'typeorm';
import { LogService } from '@log/log.service';
import { EditionService } from '@edition/edition.service';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';

@Injectable()
export class EditionCommentService {
  constructor(
    @InjectRepository(EditionCommentModel)
    private readonly editionCommentRepository: Repository<EditionCommentModel>,
    private readonly logService: LogService,
    private readonly editionService: EditionService
  ) {}

  async incrementLikeCount({ commentId }: { commentId: number }) {
    await this.editionCommentRepository.increment(
      { id: commentId },
      'like_count',
      1
    );
  }

  async decrementLikeCount({ commentId }: { commentId: number }) {
    await this.editionCommentRepository.decrement(
      { id: commentId },
      'like_count',
      1
    );
  }

  async incrementCommentCount({ commentId }: { commentId: number }) {
    await this.editionCommentRepository.increment(
      { id: commentId },
      'comment_count',
      1
    );
  }

  async decrementCommentCount({ commentId }: { commentId: number }) {
    await this.editionCommentRepository.decrement(
      { id: commentId },
      'comment_count',
      1
    );
  }

  async getAllComments(editionId: number) {
    return await this.editionCommentRepository.find({
      where: {
        edition_id: editionId,
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
    editionId,
    dto,
  }: {
    editionId: number;
    dto: PaginateQuery;
  }): Promise<Paginated<EditionCommentModel>> {
    return await paginate(dto, this.editionCommentRepository, {
      where: {
        edition_id: editionId,
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
    editionId,
    userId,
    comment,
    targetCommentId,
    targetUserId,
  }: {
    editionId: number;
    userId: number;
    comment: string;
    targetCommentId: number;
    targetUserId: number;
  }) {
    const created = this.editionCommentRepository.create({
      edition_id: editionId,
      user: {
        id: userId,
      },
      comment: comment,
      target_comment_id: targetCommentId,
      target_user_id: targetUserId,
    });

    const newEditionComment = await this.editionCommentRepository.save(created);

    if (targetCommentId == null) {
      await this.editionService.incrementCommentCount({ editionId });
    } else {
      await this.incrementCommentCount({ commentId: targetCommentId });
    }

    await this.logService.createLog({
      user_id: userId,
      target_edition_id: editionId,
      edition_comment_id: newEditionComment.id,
    });

    return newEditionComment;
  }

  async updateComment({
    commentId,
    comment,
  }: {
    commentId: number;
    comment: string;
  }) {
    const updated = await this.editionCommentRepository.update(
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
    const comment = await this.editionCommentRepository.findOne({
      where: {
        id: commentId,
      },
    });

    if (comment.target_comment_id == null) {
      await this.editionService.decrementCommentCount({
        editionId: comment.edition_id,
      });
    } else {
      await this.decrementCommentCount({
        commentId: comment.target_comment_id,
      });
    }

    const deleted = await this.editionCommentRepository.delete({
      id: commentId,
    });

    return deleted;
  }

  async getSubCommentsByCommentById(commentId: number) {
    return await this.editionCommentRepository.find({
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
