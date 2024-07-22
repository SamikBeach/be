import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookModel } from './entities/book.entity';
import { In, Repository } from 'typeorm';
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
          ...(dto.authorIds ? { authors: { id: In(dto.authorIds) } } : {}),
          ...(dto.writingIds ? { writings: { id: In(dto.writingIds) } } : {}),
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

    return {
      ...result,
      data,
    };

    // aladin API 호출 제한으로 인해 일단은 더미 데이터로 대체
    return {
      ...result,
      data: [
        ...result.data.map(book => ({
          ...book,
          info: {
            title: 'title',
            cover: 'cover',
            pubDate: '2022-01-01',
            publisher: 'publisher',
          },
        })),
      ],
    };
  }
}
