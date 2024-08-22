import { Test, TestingModule } from '@nestjs/testing';
import { NationalityController } from './nationality.controller';
import { NationalityService } from './nationality.service';

describe('NationalityController', () => {
  let controller: NationalityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NationalityController],
      providers: [NationalityService],
    }).compile();

    controller = module.get<NationalityController>(NationalityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
