import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
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
