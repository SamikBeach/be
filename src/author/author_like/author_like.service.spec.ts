import { Test, TestingModule } from '@nestjs/testing';
import { AuthorLikeService } from './author_like.service';

describe('AuthorLikeService', () => {
  let service: AuthorLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorLikeService],
    }).compile();

    service = module.get<AuthorLikeService>(AuthorLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
