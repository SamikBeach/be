import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import redisStore from 'cache-manager-redis-store';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    const config: CacheModuleOptions = {
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 60,
    };
    return config;
  }
}