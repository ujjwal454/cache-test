import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SaveCacheDto } from './dto/cache.dto';

type CacheKeySelector = {
  key: string;
};

@Controller('cache')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('')
  saveCache(@Body() body: SaveCacheDto) {
    return this.appService.saveCache(body);
  }

  @Get(':key')
  getCache(@Param() param: CacheKeySelector) {
    return this.appService.getCacheKey(param.key);
  }

  @Delete(':key')
  deleteCache(@Param() param: CacheKeySelector) {
    return this.appService.deleteCacheKey(param.key);
  }
}
