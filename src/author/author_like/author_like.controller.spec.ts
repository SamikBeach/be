import { Test, TestingModule } from '@nestjs/testing';
import { AuthorLikeController } from './author_like.controller';
import { AuthorLikeService } from './author_like.service';

describe('AuthorLikeController', () => {
  let controller: AuthorLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorLikeController],
      providers: [AuthorLikeService],
    }).compile();

    controller = module.get<AuthorLikeController>(AuthorLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
