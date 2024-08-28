import { Test, TestingModule } from '@nestjs/testing';
import { OriginalWorkCommentController } from './original_work_comment.controller';
import { OriginalWorkCommentService } from './original_work_comment.service';

describe('OriginalWorkCommentController', () => {
  let controller: OriginalWorkCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OriginalWorkCommentController],
      providers: [OriginalWorkCommentService],
    }).compile();

    controller = module.get<OriginalWorkCommentController>(
      OriginalWorkCommentController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
