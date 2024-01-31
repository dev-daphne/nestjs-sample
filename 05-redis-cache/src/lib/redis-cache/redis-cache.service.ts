import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheService {
  constructor(@InjectRedis() private readonly cache: Redis) {}

  /**
   * 캐시 가져오기
   * @param key 조회할 키
   * @returns T
   */
  async get(key: string) {
    return await this.cache.get(key);
  }

  /**
   * 캐시 생성
   * @property {key} 저장할 값의 키
   * @property {value} 저장할 값
   * @property {ttl} 기본 값: 300(seconds)(5min)
   */
  async set<T = unknown>({
    key,
    value,
    ttl = 300,
  }: {
    key: string;
    value: T;
    ttl?: number;
  }) {
    await this.cache.set(key, JSON.stringify(value), 'EX', ttl);
  }

  /**
   * 캐시 삭제
   * @param key 조회할 키 값
   * @returns 삭제 성공 여부 (실패 시 0, 성공 시 1)
   */
  async del(key: string): Promise<void> {
    await this.cache.del(key);
  }
}
