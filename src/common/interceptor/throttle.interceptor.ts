import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { Throttle } from '../decorator/throttle.decorator';

@Injectable()
export class ThrottleInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly reflector: Reflector
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>
  ): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest();

    /// URL_USERID_MINUTE
    /// VALUE -> count

    const email = request?.user?.email;
    console.log({ email });

    if (!email) {
      return next.handle();
    }

    const throttleOptions = this.reflector.get<{
      count: number;
      unit: 'minute';
    }>(Throttle, context.getHandler());

    console.log({ throttleOptions });

    if (!throttleOptions) {
      return next.handle();
    }

    const date = new Date();
    const minute = date.getMinutes();

    const key = `${request.method}_${request.path}_${email}_${minute}`;

    const count = await this.cacheManager.get<number>(key);

    console.log({ key });
    console.log({ count });

    if (count && count >= throttleOptions.count) {
      throw new ForbiddenException('요청 가능 횟수를 넘어섰습니다!');
    }

    return next.handle().pipe(
      tap(async () => {
        const count = (await this.cacheManager.get<number>(key)) ?? 0;

        await this.cacheManager.set(key, count + 1, 60000);
      })
    );
  }
}
