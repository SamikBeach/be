import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { WritingModel } from './entities/writing.entity';
import { CommonService } from '@common/common.service';
import { SearchWritingsDto } from './dto/search-writings.dto';
import axios from 'axios';
import { ENV_ALADIN_API_KEY } from '@common/const/env-keys.const';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WritingService {
  constructor(
    @InjectRepository(WritingModel)
    private readonly writingRepository: Repository<WritingModel>,
    private readonly commonService: CommonService,
    private readonly configService: ConfigService
  ) {}

  async getAllWritings() {
    return await this.writingRepository.find({
      relations: {
        author: true,
        books: true,
      },
    });
  }

  async getWritingById(writingId: number) {
    const writing = await this.writingRepository.findOne({
      where: {
        id: writingId,
      },
      relations: { author: true, books: true },
    });

    const aladinApiKey = this.configService.get<string>(ENV_ALADIN_API_KEY);

    let books = [];

    // 알라딘 API 콜 수 우선 10개로 제한
    try {
      books = await Promise.all(
        writing.books.slice(0, 10).map(async book => {
          const aladinBook = await axios.get(
            `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${aladinApiKey}&Version=20131101&itemIdType=ISBN&ItemId=${book.isbn}&output=js&OptResult=ebookList,usedList,fileFormatList,c2binfo,packing,b2bSupply,subbarcode,cardReviewImgList,ratingInfo,bestSellerRank`
          );

          return { ...book, info: aladinBook.data.item[0] };
        })
      );
    } catch (e) {
      console.log({ e });
    }

    return { ...writing, books };
  }

  async searchWritings(dto: SearchWritingsDto) {
    return this.commonService.paginate(
      dto,
      this.writingRepository,
      {
        where: {
          ...(dto.authorIds ? { author: { id: In(dto.authorIds) } } : {}),
        },
        relations: { author: true, books: true },
      },
      'writing/search'
    );
  }
}
