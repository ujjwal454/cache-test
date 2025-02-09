import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async setValue(key: string, value: string, ...rest) {
    try {
      await this.redisClient.set(key, value, ...rest);
    } catch (error) {
      console.error('Error setting value in Redis:', error);
    }
  }

  async getValue(key: string): Promise<string | null> {
    try {
      return await this.redisClient.get(key);
    } catch (error) {
      console.error('Error getting value from Redis:', error);
      return null;
    }
  }
  async deleteValue(key: string): Promise<any> {
    try {
      return await this.redisClient.del(key);
    } catch (error) {
      console.error('Error getting value from Redis:', error);
      return null;
    }
  }
}
