import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Metadata } from './models/Metadata';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  getItem(@Param('id') frogId: number): Promise<Metadata> {
    return this.appService.getFrog(frogId);
  }
}
