import { Controller, Get, Param } from "@nestjs/common";
import { ItemsContractMetadata } from "../models/ItemsContractMetadata";
import { Item } from "../models/Item";
import { ItemService } from "./item.service";

@Controller('item')
export class ItemController {

  constructor(private readonly itemService: ItemService) {}

  @Get('/contract')
  getItemsContractMetadata(): ItemsContractMetadata {
    return {
      name: 'Froggy Shop',
      description: 'The official Froggy Friends - Ribbit Market items',
      image:
        'https://froggyfriends.mypinata.cloud/ipfs/QmWTpDVCUewNUS3Rix4rCV1GmMUDF9E8EbAtBZMDztjohh',
      external_link: 'https://froggyfriends.io',
      seller_fee_basis_points: 1000,
      fee_recipient: '0x6b01aD68aB6F53128B7A6Fe7E199B31179A4629a',
    };
  }

  @Get('/:id')
  getItem(@Param('id') itemId: number): Promise<Item> {
    return this.itemService.getItem(itemId);
  }
}