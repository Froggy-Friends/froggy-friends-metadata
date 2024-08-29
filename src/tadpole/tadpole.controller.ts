import { Controller, Get, Param } from '@nestjs/common';
import { TadpoleMetadata } from '../models/TadpoleMetadata';
import { TadpoleService } from './tadpole.service';

@Controller('tadpole')
export class TadpoleController {
  constructor(private readonly tadpoleService: TadpoleService) {}

  @Get('/:id')
  async getTadpole(@Param('id') id: string): Promise<TadpoleMetadata> {
    const tadpole = await this.tadpoleService.findTadpole(+id);
    return this.tadpoleService.tadpoleToMetadata(tadpole);
  }
}
