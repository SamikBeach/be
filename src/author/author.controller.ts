import { Controller, Get, Param } from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @Get(':authorId')
  getAuthorById(@Param('authorId') authorId: number) {
    return this.authorService.getAuthorById(authorId);
  }
}
