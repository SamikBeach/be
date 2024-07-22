import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AuthorModel } from './entities/author.entity';
import { SearchAuthorDto } from './dto/search-author.dto';
import { CommonService } from '@common/common.service';
import axios from 'axios';
import { ENV_ALADIN_API_KEY } from '@common/const/env-keys.const';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorModel)
    private readonly authorRepository: Repository<AuthorModel>,
    private readonly commonService: CommonService,
    private readonly configService: ConfigService
  ) {}

  async getAllAuthors() {
    return await this.authorRepository.find({
      relations: {
        // nationality: true,
        writings: true,
        // educations: true,
        // eras: true,
        // regions: true,
        // schools: true,
        // main_interests: true,
        // influenceds: true,
        // influenced_bys: true,
        // books: true,
      },
    });
  }

  async getAuthorById(authorId: number) {
    const author = await this.authorRepository.findOne({
      where: { id: authorId },
      relations: {
        nationality: true,
        // writings: true,
        educations: true,
        eras: true,
        regions: true,
        schools: true,
        main_interests: true,
        influenceds: true,
        influenced_bys: true,
        // books: true,
      },
    });

    const aladinApiKey = this.configService.get<string>(ENV_ALADIN_API_KEY);

    let books = [];

    // 알라딘 API 콜 수 우선 10개로 제한
    try {
      books = await Promise.all(
        author.books.slice(0, 10).map(async book => {
          const aladinBook = await axios.get(
            `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${aladinApiKey}&Version=20131101&itemIdType=ISBN&ItemId=${book.isbn}&output=js&OptResult=ebookList,usedList,fileFormatList,c2binfo,packing,b2bSupply,subbarcode,cardReviewImgList,ratingInfo,bestSellerRank`
          );

          return { ...book, info: aladinBook.data.item[0] };
        })
      );
    } catch (e) {
      console.log({ e });
    }

    return { ...author, books };
  }

  async searchAuthors(dto: SearchAuthorDto) {
    return this.commonService.paginate(
      dto,
      this.authorRepository,
      {
        where: {
          ...(dto.nationalityIds
            ? { nationality: { id: In(dto.nationalityIds) } }
            : {}),
          ...(dto.eraIds ? { eras: { id: In(dto.eraIds) } } : {}),
          ...(dto.regionIds ? { regions: { id: In(dto.regionIds) } } : {}),
          ...(dto.mainInterestIds
            ? { main_interests: { id: In(dto.mainInterestIds) } }
            : {}),
          ...(dto.schoolIds ? { schools: { id: In(dto.schoolIds) } } : {}),
          ...(dto.educationIds
            ? { educations: { id: In(dto.educationIds) } }
            : {}),
        },
        relations: {
          nationality: true,
          // writings: true,
          educations: true,
          eras: true,
          regions: true,
          schools: true,
          main_interests: true,
          // influenceds: true,
          // influenced_bys: true,
          // books: true,
        },
        order: dto.sort?.reduce((acc, cur) => {
          if (cur.type === 'name') {
            acc[cur.type] = cur.direction;
          } else if (cur.type === 'nationality') {
            acc[cur.type] = {
              [cur.type]: cur.direction,
            };
          } else if (cur.type === 'era') {
            acc['eras'] = {
              [cur.type]: cur.direction,
            };
          } else if (cur.type === 'region') {
            acc['regions'] = {
              [cur.type]: cur.direction,
            };
          } else if (cur.type === 'education') {
            acc['educations'] = {
              [cur.type]: cur.direction,
            };
          } else if (cur.type === 'main_interest') {
            acc['main_interests'] = {
              [cur.type]: cur.direction,
            };
          } else if (cur.type === 'school') {
            acc['schools'] = {
              [cur.type]: cur.direction,
            };
          }

          return acc;
        }, {}),
      },
      'author/search'
    );
  }
}
