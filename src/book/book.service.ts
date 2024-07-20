import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookModel } from './entities/book.entity';
import { Repository } from 'typeorm';
import axios from 'axios';
import { ENV_ALADIN_API_KEY } from '@common/const/env-keys.const';
import { ConfigService } from '@nestjs/config';
import { CommonService } from '@common/common.service';
import { SearchBooksDto } from './dto/search-books.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookModel)
    private readonly bookRepository: Repository<BookModel>,
    private readonly configService: ConfigService,
    private readonly commonService: CommonService
  ) {}

  async getAllBooks() {
    return await this.bookRepository.find({
      relations: { authors: true, writings: true },
    });
  }

  async getBookById(bookId: number) {
    const book = await this.bookRepository.findOne({
      where: {
        id: bookId,
      },
      relations: { authors: true, writings: true },
    });

    const aladinApiKey = this.configService.get<string>(ENV_ALADIN_API_KEY);

    const aladinBook = await axios.get(
      `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${aladinApiKey}&Version=20131101&itemIdType=ISBN&ItemId=${book.isbn}&cover=Big&output=js&OptResult=ebookList,usedList,fileFormatList,c2binfo,packing,b2bSupply,subbarcode,cardReviewImgList,ratingInfo,bestSellerRank`
    );

    return { ...book, info: aladinBook.data.item[0] };
  }

  async searchBooks(dto: SearchBooksDto) {
    const result = await this.commonService.paginate(
      dto,
      this.bookRepository,
      {
        where: {
          ...(dto.authorId ? { authors: { id: dto.authorId } } : {}),
          ...(dto.writingId ? { writings: { id: dto.writingId } } : {}),
        },
        relations: { authors: true, writings: true },
      },
      'book/search'
    );

    const aladinApiKey = this.configService.get<string>(ENV_ALADIN_API_KEY);

    const data = await Promise.all(
      result.data.map(async book => {
        const aladinBook = await axios.get(
          `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${aladinApiKey}&Version=20131101&itemIdType=ISBN&ItemId=${book.isbn}&cover=Big&output=js&OptResult=ebookList,usedList,fileFormatList,c2binfo,packing,b2bSupply,subbarcode,cardReviewImgList,ratingInfo,bestSellerRank`
        );

        return { ...book, info: aladinBook.data.item[0] };
      })
    );

    return { ...result, data };
  }
}
