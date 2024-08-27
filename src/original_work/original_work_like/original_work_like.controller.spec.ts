import { Test, TestingModule } from '@nestjs/testing';
import { OriginalWorkLikeController } from './original_work_like.controller';
import { OriginalWorkLikeService } from './original_work_like.service';

describe('OriginalWorkLikeController', () => {
  let controller: OriginalWorkLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OriginalWorkLikeController],
      providers: [OriginalWorkLikeService],
    }).compile();

    controller = module.get<OriginalWorkLikeController>(OriginalWorkLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
