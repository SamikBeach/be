import { Test, TestingModule } from '@nestjs/testing';
import { OriginalWorkController } from './original_work.controller';
import { OriginalWorkService } from './original_work.service';

describe('OriginalWorkController', () => {
  let controller: OriginalWorkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OriginalWorkController],
      providers: [OriginalWorkService],
    }).compile();

    controller = module.get<OriginalWorkController>(OriginalWorkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
