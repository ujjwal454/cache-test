import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SaveCacheDto } from './dto/cache.dto';
import { RedisService } from './redis/redis.service';

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}

  async saveCache(data: SaveCacheDto) {
    try {
      const t = await this.redisService.setValue(data.key, data.value);
      return {
        message: 'saved successfully',
        ...data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCacheKey(key: string) {
    try {
      const value = await this.redisService.getValue(key);
      if (!value) {
        return new NotFoundException(`key ${key} not found`);
      }
      return value;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteCacheKey(key: string) {
    try {
      await this.redisService.deleteValue(key);
      return {
        message: 'deleted successfully',
        key,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
