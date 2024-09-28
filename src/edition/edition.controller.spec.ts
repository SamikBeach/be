import { Test, TestingModule } from '@nestjs/testing';
import { EditionController } from './edition.controller';
import { EditionService } from './edition.service';

describe('EditionController', () => {
  let controller: EditionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditionController],
      providers: [EditionService],
    }).compile();

    controller = module.get<EditionController>(EditionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
