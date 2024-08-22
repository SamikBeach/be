import { Test, TestingModule } from '@nestjs/testing';
import { OriginalWorkService } from './original_work.service';

describe('OriginalWorkService', () => {
  let service: OriginalWorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OriginalWorkService],
    }).compile();

    service = module.get<OriginalWorkService>(OriginalWorkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
