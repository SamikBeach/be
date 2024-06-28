import { Test, TestingModule } from '@nestjs/testing';
import { MainInterestController } from './main_interest.controller';
import { MainInterestService } from './main_interest.service';

describe('MainInterestController', () => {
  let controller: MainInterestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainInterestController],
      providers: [MainInterestService],
    }).compile();

    controller = module.get<MainInterestController>(MainInterestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
