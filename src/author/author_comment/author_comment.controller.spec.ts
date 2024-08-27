import { Test, TestingModule } from '@nestjs/testing';
import { AuthorCommentController } from './author_comment.controller';
import { AuthorCommentService } from './author_comment.service';

describe('AuthorCommentController', () => {
  let controller: AuthorCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorCommentController],
      providers: [AuthorCommentService],
    }).compile();

    controller = module.get<AuthorCommentController>(AuthorCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
