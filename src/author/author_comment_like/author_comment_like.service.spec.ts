import { Test, TestingModule } from '@nestjs/testing';
import { AuthorCommentLikeService } from './author_comment_like.service';

describe('AuthorCommentLikeService', () => {
  let service: AuthorCommentLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorCommentLikeService],
    }).compile();

    service = module.get<AuthorCommentLikeService>(AuthorCommentLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
