import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorCommentModel } from './entities/author_comment.entity';
import { IsNull, Repository } from 'typeorm';
import { LogService } from '@log/log.service';
import { CommonService } from '@common/common.service';
import { AuthorService } from '@author/author.service';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';

@Injectable()
export class AuthorCommentService {
  constructor(
    @InjectRepository(AuthorCommentModel)
    private readonly authorCommentRepository: Repository<AuthorCommentModel>,
    private readonly commonService: CommonService,
    private readonly logService: LogService,
    private readonly authorService: AuthorService
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

  async searchComments({
    authorId,
    dto,
  }: {
    authorId: number;
    dto: PaginateQuery;
  }): Promise<Paginated<AuthorCommentModel>> {
    return await paginate(dto, this.authorCommentRepository, {
      where: {
        author_id: authorId,
        target_comment_id: IsNull(),
      },
      sortableColumns: ['id', 'like_count', 'comment_count'],
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: ['comment'],
      relativePath: true,
      relations: ['author', 'user'],
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

    if (targetCommentId == null) {
      await this.authorService.incrementCommentCount({ authorId });
    }

    await this.logService.createLog({
      user_id: userId,
      target_author_id: authorId,
      author_comment_id: newAuthorComment.id,
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

    const comment = await this.authorCommentRepository.findOne({
      where: {
        id: commentId,
      },
    });

    if (comment.target_comment_id == null) {
      await this.authorService.decrementCommentCount({
        authorId: comment.author_id,
      });
    }

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
