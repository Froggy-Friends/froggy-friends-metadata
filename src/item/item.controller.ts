import { Controller, Get, Param } from "@nestjs/common";
import { ContractMetadata } from "src/models/ContractMetadata";
import { Item } from "./item.entity";
import { ItemService } from "./item.service";

@Controller('/items')
export class ItemsController {
  constructor(private readonly itemService: ItemService) {} 

  @Get('/:id') // used by ribbit item contract
  getItem(@Param('id') id: number): Promise<Item> {
    return this.itemService.getItem(id);
  }

  @Get('/contract') // used by ribbit item contract
  getContractMetadata(): ContractMetadata {
    return this.itemService.getContractMetadata();
  }
}