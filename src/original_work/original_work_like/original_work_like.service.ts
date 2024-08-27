import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OriginalWorkLikeModel } from './entities/original_work_like.entity';

@Injectable()
export class OriginalWorkLikeService {
  constructor(
    @InjectRepository(OriginalWorkLikeModel)
    private readonly originalWorkLikeRepository: Repository<OriginalWorkLikeModel>
  ) {}

  async addLike({
    originalWorkId,
    userId,
  }: {
    originalWorkId: number;
    userId: number;
  }) {
    const created = this.originalWorkLikeRepository.create({
      user_id: userId,
      original_work_id: originalWorkId,
    });

    const newOriginalWorkLike =
      await this.originalWorkLikeRepository.save(created);

    return newOriginalWorkLike;
  }

  async removeLike({
    originalWorkId,
    userId,
  }: {
    originalWorkId: number;
    userId: number;
  }) {
    const deleted = await this.originalWorkLikeRepository.delete({
      user_id: userId,
      original_work_id: originalWorkId,
    });

    return deleted;
  }

  async findLike({
    originalWorkId,
    userId,
  }: {
    originalWorkId: number;
    userId: number;
  }) {
    const isExist = await this.originalWorkLikeRepository.exists({
      where: {
        user_id: userId,
        original_work_id: originalWorkId,
      },
    });

    return { isExist };
  }

  async findAllLikes(originalWorkId: number) {
    const likes = await this.originalWorkLikeRepository.find({
      where: {
        original_work_id: originalWorkId,
      },
    });

    return { count: likes.length };
  }
}
