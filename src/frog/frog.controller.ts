import { Controller, Get, Param } from '@nestjs/common';
import { Metadata } from '../models/Metadata';
import { FrogService } from './frog.service';

@Controller('frog')
export class FrogController {
  constructor(private readonly frogService: FrogService) {}

  @Get('/all')
  getEthMetadata(): Promise<Metadata[]> {
    return this.frogService.getAllFrogs();
  }

  @Get('/:id')
  getFrog(@Param('id') frogId: number): Promise<Metadata> {
    return this.frogService.getFrog(frogId);
  }
}
