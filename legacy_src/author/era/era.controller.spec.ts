import { Test, TestingModule } from '@nestjs/testing';
import { EraController } from './era.controller';
import { EraService } from './era.service';

describe('EraController', () => {
  let controller: EraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EraController],
      providers: [EraService],
    }).compile();

    controller = module.get<EraController>(EraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
