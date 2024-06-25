import { Test, TestingModule } from '@nestjs/testing';
import { NationalityService } from './nationality.service';

describe('NationalityService', () => {
  let service: NationalityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NationalityService],
    }).compile();

    service = module.get<NationalityService>(NationalityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
