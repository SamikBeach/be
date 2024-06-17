import { Controller, Get, Param } from '@nestjs/common';
import { AuthorService } from './author.service';
import { IsPublic } from 'src/common/decorator/is-public.decorator';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  @IsPublic()
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @Get(':authorId')
  getAuthorById(@Param('authorId') authorId: number) {
    return this.authorService.getAuthorById(authorId);
  }
}
