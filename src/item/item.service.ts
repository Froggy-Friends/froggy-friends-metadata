import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Item } from "./item.entity";

@Injectable()
export class ItemService {

  constructor(@InjectRepository(Item) private itemRepo: Repository<Item>) {}

  async getItem(id: number): Promise<Item> {
    return await this.itemRepo.findOneBy({ id: id });
  }
}