import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from '@auth/decorator/is-public.decorator';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('author')
@ApiBearerAuth()
@ApiTags('author')
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
  @UseInterceptors(CacheInterceptor)
  @CacheKey('author/trending')
  @CacheTTL(100000)
  getTrendingAuthors() {
    return this.authorService.getTrendingAuthors();
  }

  @Get(':authorId')
  @IsPublic()
  getAuthorById(@Param('authorId') authorId: number) {
    return this.authorService.getAuthorById(authorId);
  }

  @Get(':authorId/editions')
  @IsPublic()
  searchAuthorEditions(@Param('authorId') authorId: number) {
    return this.authorService.searchAuthorEditions(authorId);
  }
}
