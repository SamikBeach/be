import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class NicknameValidationPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!value) {
      return value;
    }

    /// 만약에 글자 길이가 2보다 작거나 같으면 에러 던지기!
    if (value.length <= 1) {
      throw new BadRequestException('닉네임 2자 이상 작성해주세요!');
    }

    return value;
  }
}
