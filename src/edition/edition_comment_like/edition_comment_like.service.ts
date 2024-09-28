import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EditionCommentLikeModel } from './entities/edition_comment_like.entity';
import { Repository } from 'typeorm';
import { EditionCommentService } from '@edition/edition_comment/edition_comment.service';

@Injectable()
export class EditionCommentLikeService {
  constructor(
    @InjectRepository(EditionCommentLikeModel)
    private readonly editionCommentLikeRepository: Repository<EditionCommentLikeModel>,
    private readonly editionCommentService: EditionCommentService
  ) {}

  async addLike({
    editionCommentId,
    userId,
  }: {
    editionCommentId: number;
    userId: number;
  }) {
    const created = this.editionCommentLikeRepository.create({
      user_id: userId,
      edition_comment_id: editionCommentId,
    });

    const newEditionLike =
      await this.editionCommentLikeRepository.save(created);

    await this.editionCommentService.incrementLikeCount({
      commentId: editionCommentId,
    });

    return newEditionLike;
  }

  async removeLike({
    editionCommentId,
    userId,
  }: {
    editionCommentId: number;
    userId: number;
  }) {
    const deleted = await this.editionCommentLikeRepository.delete({
      user_id: userId,
      edition_comment_id: editionCommentId,
    });

    await this.editionCommentService.decrementLikeCount({
      commentId: editionCommentId,
    });

    return deleted;
  }

  async findLike({
    editionCommentId,
    userId,
  }: {
    editionCommentId: number;
    userId: number;
  }) {
    const isExist = await this.editionCommentLikeRepository.exists({
      where: {
        user_id: userId,
        edition_comment_id: editionCommentId,
      },
    });

    return { isExist };
  }

  async findAllLikes(editionCommentId: number) {
    const likes = await this.editionCommentLikeRepository.find({
      where: {
        edition_comment_id: editionCommentId,
      },
    });

    return { count: likes.length };
  }
}
