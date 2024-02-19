import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ItemMetadata } from './item/item.metadata';
import { ItemsContractMetadata } from './models/ItemsContractMetadata';
import { Metadata } from './models/Metadata';
import { TadpoleMetadata } from './models/TadpoleMetadata';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/:id')
  getFrog(@Param('id') frogId: number): Promise<Metadata> {
    return this.appService.getFrog(frogId);
  }

  @Get('/frogfather/:id')
  getFrogfather() {
    return {
      name: 'The Frogfather',
      description: "You'll pay me royalties now - The Frogfather",
      image:
        'https://froggyfriends.mypinata.cloud/ipfs/QmPzNuiczLzrPfhAHGeFTNoasjTGKAa53D9xemJPyTK3jc',
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
      name: 'Tadpole Evolution',
      description: 'The official ERC404 Collection of Froggy Friends',
      image:
        'https://froggyfriends.mypinata.cloud/ipfs/QmeBxxoSkC5QfJvzAggv1rruPXiMj3bCnQQ84AD7hpgcF6',
      attributes: [],
    };
  }
}
