import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Item } from './item/item.entity';
import { ItemMetadata } from './item/item.metadata';
import { Metadata } from './models/Metadata';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  getFrog(@Param('id') frogId: number): Promise<Metadata> {
    return this.appService.getFrog(frogId);
  }

  @Get('/item/:id')
  getItem(@Param('id') itemId: number): Promise<ItemMetadata> {
    return this.appService.getItem(itemId);
  }
}
