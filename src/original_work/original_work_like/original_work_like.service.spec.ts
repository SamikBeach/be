import { Test, TestingModule } from '@nestjs/testing';
import { OriginalWorkLikeService } from './original_work_like.service';

describe('OriginalWorkLikeService', () => {
  let service: OriginalWorkLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OriginalWorkLikeService],
    }).compile();

    service = module.get<OriginalWorkLikeService>(OriginalWorkLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
