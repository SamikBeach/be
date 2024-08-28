import { Test, TestingModule } from '@nestjs/testing';
import { OriginalWorkCommentService } from './original_work_comment.service';

describe('OriginalWorkCommentService', () => {
  let service: OriginalWorkCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OriginalWorkCommentService],
    }).compile();

    service = module.get<OriginalWorkCommentService>(
      OriginalWorkCommentService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
