import { Test, TestingModule } from '@nestjs/testing';
import { AuthorCommentLikeController } from './author_comment_like.controller';
import { AuthorCommentLikeService } from './author_comment_like.service';

describe('AuthorCommentLikeController', () => {
  let controller: AuthorCommentLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorCommentLikeController],
      providers: [AuthorCommentLikeService],
    }).compile();

    controller = module.get<AuthorCommentLikeController>(AuthorCommentLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
