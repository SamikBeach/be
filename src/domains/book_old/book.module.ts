import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entity/book.entity';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity]), AuthModule],
  controllers: [BookController],
  providers: [BookService, Logger],
})
export class BookModule {}
