import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EditionLikeModel } from './entities/edition_like.entity';
import { LogService } from '@log/log.service';
import { EditionService } from '@edition/edition.service';

@Injectable()
export class EditionLikeService {
  constructor(
    @InjectRepository(EditionLikeModel)
    private readonly editionLikeRepository: Repository<EditionLikeModel>,
    private readonly editionService: EditionService,
    private readonly logService: LogService
  ) {}

  async addLike({ editionId, userId }: { editionId: number; userId: number }) {
    const created = this.editionLikeRepository.create({
      user_id: userId,
      edition_id: editionId,
    });

    const newEditionLike = await this.editionLikeRepository.save(created);

    await this.logService.createLog({
      user_id: userId,
      target_edition_id: editionId,
    });

    await this.editionService.incrementLikeCount({ editionId });

    return newEditionLike;
  }

  async removeLike({
    editionId,
    userId,
  }: {
    editionId: number;
    userId: number;
  }) {
    const deleted = await this.editionLikeRepository.delete({
      user_id: userId,
      edition_id: editionId,
    });

    await this.editionService.decrementLikeCount({ editionId });

    return deleted;
  }

  async findLike({ editionId, userId }: { editionId: number; userId: number }) {
    const isExist = await this.editionLikeRepository.exists({
      where: {
        user_id: userId,
        edition_id: editionId,
      },
    });

    return { isExist };
  }

  async getLikeCountByEditionId(editionId: number) {
    const likes = await this.editionLikeRepository.find({
      where: {
        edition_id: editionId,
      },
    });

    return { count: likes.length };
  }
}
