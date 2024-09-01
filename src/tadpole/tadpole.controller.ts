import { Controller, Get, Param } from '@nestjs/common';
import { TadpoleMetadata } from '../models/TadpoleMetadata';
import { TadpoleService } from './tadpole.service';
import BigNumber from 'bignumber.js';

@Controller('tadpole')
export class TadpoleController {
  constructor(private readonly tadpoleService: TadpoleService) {}

  @Get('/:id')
  async getTadpole(@Param('id') id: string): Promise<TadpoleMetadata> {
    const prefix = new BigNumber(
      '57896044618658097711785492504343953926634992332820282019728792003956564819968',
    );
    const encodedId = new BigNumber(id);
    const decodedId = encodedId.minus(prefix);
    const decodedTokenId = decodedId.toNumber();
    const tadpole = await this.tadpoleService.findTadpole(decodedTokenId);
    return this.tadpoleService.tadpoleToMetadata(tadpole);
  }
}
