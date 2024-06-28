import { Test, TestingModule } from '@nestjs/testing';
import { MainInterestService } from './main_interest.service';

describe('MainInterestService', () => {
  let service: MainInterestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainInterestService],
    }).compile();

    service = module.get<MainInterestService>(MainInterestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
