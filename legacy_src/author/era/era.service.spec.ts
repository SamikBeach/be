import { Test, TestingModule } from '@nestjs/testing';
import { EraService } from './era.service';

describe('EraService', () => {
  let service: EraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EraService],
    }).compile();

    service = module.get<EraService>(EraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
