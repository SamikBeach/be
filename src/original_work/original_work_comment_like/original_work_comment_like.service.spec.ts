import { Test, TestingModule } from '@nestjs/testing';
import { OriginalWorkCommentLikeService } from './original_work_comment_like.service';

describe('OriginalWorkCommentLikeService', () => {
  let service: OriginalWorkCommentLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OriginalWorkCommentLikeService],
    }).compile();

    service = module.get<OriginalWorkCommentLikeService>(
      OriginalWorkCommentLikeService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
