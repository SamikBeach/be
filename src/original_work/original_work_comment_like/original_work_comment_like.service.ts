import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OriginalWorkCommentLikeModel } from './entities/original_work_comment_like.entity';
import { Repository } from 'typeorm';
import { OriginalWorkCommentService } from '@original_work/original_work_comment/original_work_comment.service';

@Injectable()
export class OriginalWorkCommentLikeService {
  constructor(
    @InjectRepository(OriginalWorkCommentLikeModel)
    private readonly originalWorkCommentLikeRepository: Repository<OriginalWorkCommentLikeModel>,
    private readonly originalWorkCommentService: OriginalWorkCommentService
  ) {}

  async addLike({
    originalWorkCommentId,
    userId,
  }: {
    originalWorkCommentId: number;
    userId: number;
  }) {
    const created = this.originalWorkCommentLikeRepository.create({
      user_id: userId,
      original_work_comment_id: originalWorkCommentId,
    });

    const newOriginalWorkLike =
      await this.originalWorkCommentLikeRepository.save(created);

    await this.originalWorkCommentService.incrementLikeCount({
      commentId: originalWorkCommentId,
    });

    return newOriginalWorkLike;
  }

  async removeLike({
    originalWorkCommentId,
    userId,
  }: {
    originalWorkCommentId: number;
    userId: number;
  }) {
    const deleted = await this.originalWorkCommentLikeRepository.delete({
      user_id: userId,
      original_work_comment_id: originalWorkCommentId,
    });

    await this.originalWorkCommentService.decrementLikeCount({
      commentId: originalWorkCommentId,
    });

    return deleted;
  }

  async findLike({
    originalWorkCommentId,
    userId,
  }: {
    originalWorkCommentId: number;
    userId: number;
  }) {
    const isExist = await this.originalWorkCommentLikeRepository.exists({
      where: {
        user_id: userId,
        original_work_comment_id: originalWorkCommentId,
      },
    });

    return { isExist };
  }

  async findAllLikes(originalWorkCommentId: number) {
    const likes = await this.originalWorkCommentLikeRepository.find({
      where: {
        original_work_comment_id: originalWorkCommentId,
      },
    });

    return { count: likes.length };
  }
}
