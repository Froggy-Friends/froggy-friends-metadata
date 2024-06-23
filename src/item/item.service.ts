import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Item } from "./item.entity";
import { MetadataService } from "src/metadata/metadata.service";
import { Item as ItemMetadata } from "../models/Item";

@Injectable()
export class ItemService {

  constructor(
    @InjectRepository(Item) private itemRepo: Repository<Item>, 
    private metadataService: MetadataService
  ) {}

  async getItem(id: number): Promise<ItemMetadata> {
    const item = await this.itemRepo.findOneBy({ id: id });
    const attributes = this.metadataService.getItemAttributes(item);

    const metadata: ItemMetadata = {
      name: item.name,
      description: item.description,
      image: item.image,
      attributes: attributes,
    };
    return metadata;
  }
}