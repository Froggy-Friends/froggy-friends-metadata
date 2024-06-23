import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Metadata } from './models/Metadata';

export enum Chain {
  Ethereum,
  Blast,
  Base,
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/blast/frog/:id')
  getBlastFrog(@Param('id') frogId: number): Promise<Metadata> {
    return this.appService.getPixelFrog(frogId);
  }

  @Get('/migrated/:id')
  getFrogfather() {
    return {
      name: 'Froggy Friends Has Migrated',
      description:
        'Froggy Friends has migrated, see froggyfriends.io for official links',
      image:
        'https://froggyfriends.mypinata.cloud/ipfs/QmTPi3ERitz7ksRP9A7cF5Ydxf27YL46H4hahLzvmtaPR9',
    };
  }
}
