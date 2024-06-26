import { Controller, Get, Param, Query } from '@nestjs/common';
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

  @Get('search')
  @IsPublic()
  searchAuthor(
    @Query('nationalityId') nationalityId: number,
    @Query('eraId') eraId: number,
    @Query('regionId') regionId: number
  ) {
    return this.authorService.searchAuthors({
      nationalityId,
      eraId,
      regionId,
    });
  }

  @Get(':authorId')
  @IsPublic()
  getAuthorById(@Param('authorId') authorId: number) {
    return this.authorService.getAuthorById(authorId);
  }
}
