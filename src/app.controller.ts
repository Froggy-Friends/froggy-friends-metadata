import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ItemMetadata } from './item/item.metadata';
import { ItemsContractMetadata } from './models/ItemsContractMetadata';
import { Metadata } from './models/Metadata';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  getFrog(@Param('id') frogId: number): Promise<Metadata> {
    return this.appService.getFrog(frogId);
  }

  @Get('/item/contract')
  getItemsContractMetadata(): ItemsContractMetadata {
    return {
      "name": "Froggy Shop",
      "description": "The official Froggy Friends - Ribbit Market items",
      "image": "https://froggyfriends.mypinata.cloud/ipfs/QmWTpDVCUewNUS3Rix4rCV1GmMUDF9E8EbAtBZMDztjohh",
      "external_link": "https://froggyfriendsnft.com",
      "seller_fee_basis_points": 1000,
      "fee_recipient": "0x6b01aD68aB6F53128B7A6Fe7E199B31179A4629a"
    }
  }

  @Get('/item/:id')
  getItem(@Param('id') itemId: number): Promise<ItemMetadata> {
    return this.appService.getItem(itemId);
  }
}
