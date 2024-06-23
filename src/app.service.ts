import { Injectable } from '@nestjs/common';
import { FrogService } from './frog/frog.service';
import { Metadata } from './models/Metadata';
import { ItemService } from './item/item.service';
import { ItemMetadata } from './item/item.metadata';
import { Chain } from './app.controller';
import { MetadataService } from './metadata/metadata.service';

@Injectable()
export class AppService {

  constructor(
    private readonly frogService: FrogService,
    private readonly itemService: ItemService,
    private readonly metadataService: MetadataService
  ) {}

  async getAllFrogs(chain: Chain): Promise<any[]> {
    let metadata = [];

    if (chain === Chain.Ethereum) {
      const frogs = await this.frogService.findAll();
      metadata = frogs.map((frog) => this.metadataService.frogToSimpleMetadata(frog));
    }
    return metadata;
  }

  async getPixelFrog(frogId: number): Promise<Metadata> {
    const frog = await this.frogService.findOne(frogId)
    return this.metadataService.frogToPixelMetadata(frog)
  }

  async getFrog(frogId: number): Promise<Metadata> {
    const frog = await this.frogService.findOne(frogId);
    return this.metadataService.frogToMetadata(frog);
  }

  async getItem(itemId: number): Promise<ItemMetadata> {
    const item = await this.itemService.getItem(itemId);
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
