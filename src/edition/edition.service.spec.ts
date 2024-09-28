import { Test, TestingModule } from '@nestjs/testing';
import { EditionService } from './edition.service';

describe('EditionService', () => {
  let service: EditionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EditionService],
    }).compile();

    service = module.get<EditionService>(EditionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
