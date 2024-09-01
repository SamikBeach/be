import { Controller, Get, Param } from '@nestjs/common';
import { AuthorService } from './author.service';
import { IsPublic } from '@common/decorator/is-public.decorator';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  @IsPublic()
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @Get('search')
  @IsPublic()
  searchAuthor(@Paginate() query: PaginateQuery) {
    return this.authorService.searchAuthors(query);
  }

  @Get('trending')
  @IsPublic()
  getTrendingAuthors() {
    return this.authorService.getTrendingAuthors();
  }

  @Get(':authorId')
  @IsPublic()
  getAuthorById(@Param('authorId') authorId: number) {
    return this.authorService.getAuthorById(authorId);
  }
}
