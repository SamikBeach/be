import { Test, TestingModule } from '@nestjs/testing';
import { AuthorCommentService } from './author_comment.service';

describe('AuthorCommentService', () => {
  let service: AuthorCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorCommentService],
    }).compile();

    service = module.get<AuthorCommentService>(AuthorCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
