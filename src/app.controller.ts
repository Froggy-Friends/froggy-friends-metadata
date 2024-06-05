import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ItemMetadata } from './item/item.metadata';
import { ItemsContractMetadata } from './models/ItemsContractMetadata';
import { Metadata } from './models/Metadata';
import { TadpoleMetadata } from './models/TadpoleMetadata';

export enum Chain {
  Ethereum,
  Blast,
  Base,
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  getFrog(@Param('id') frogId: number): Promise<Metadata> {
    return this.appService.getFrog(frogId);
  }

  @Get('/base/frog/:id')
  getBaseFrog(@Param('id') frogId: number): Promise<Metadata> {
    return this.appService.getFrog(frogId);
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

  @Get('/item/contract')
  getItemsContractMetadata(): ItemsContractMetadata {
    return {
      name: 'Froggy Shop',
      description: 'The official Froggy Friends - Ribbit Market items',
      image:
        'https://froggyfriends.mypinata.cloud/ipfs/QmWTpDVCUewNUS3Rix4rCV1GmMUDF9E8EbAtBZMDztjohh',
      external_link: 'https://froggyfriendsnft.com',
      seller_fee_basis_points: 1000,
      fee_recipient: '0x6b01aD68aB6F53128B7A6Fe7E199B31179A4629a',
    };
  }

  @Get('/item/:id')
  getItem(@Param('id') itemId: number): Promise<ItemMetadata> {
    return this.appService.getItem(itemId);
  }

  @Get('/tadpole/:id')
  getTadpole(): TadpoleMetadata {
    return {
      name: 'Tadpoles',
      description: 'The official ERC404 Collection of Froggy Friends',
      image:
        'https://froggyfriends.mypinata.cloud/ipfs/QmWqdzCvPYyifzoPYiwehm1gkGLiYVFzWDYz9o3n7nLHMG',
      attributes: [],
    };
  }

  @Get('/eth/frogs')
  getEthMetadata(): Promise<Metadata[]> {
    return this.appService.getAllFrogs(Chain.Ethereum);
  }
}
