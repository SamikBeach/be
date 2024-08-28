import { Test, TestingModule } from '@nestjs/testing';
import { OriginalWorkCommentLikeController } from './original_work_comment_like.controller';
import { OriginalWorkCommentLikeService } from './original_work_comment_like.service';

describe('OriginalWorkCommentLikeController', () => {
  let controller: OriginalWorkCommentLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OriginalWorkCommentLikeController],
      providers: [OriginalWorkCommentLikeService],
    }).compile();

    controller = module.get<OriginalWorkCommentLikeController>(
      OriginalWorkCommentLikeController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
