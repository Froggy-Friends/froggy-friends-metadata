import { Injectable } from '@nestjs/common';
import { Frog } from './frog/frog.entity';
import { FrogService } from './frog/frog.service';
import { Attribute } from './models/Attribute';
import { Metadata } from './models/Metadata';
import { ConfigService } from '@nestjs/config';
import { Item } from './item/item.entity';
import { ItemService } from './item/item.service';
import { ItemMetadata } from './item/item.metadata';

@Injectable()
export class AppService {
  private froggyGatewayUrl: string;

  constructor(
    private readonly frogService: FrogService,
    private readonly itemService: ItemService,
    private readonly config: ConfigService
  ) {
    this.froggyGatewayUrl = this.config.get<string>('IPFS_URL');
  }

  async getFrog(frogId: number): Promise<Metadata> {
    const frog = await this.frogService.findOne(frogId);
    const { ribbit } = frog;
    if (frog.isPaired && frog.friendBoost) {
      frog.ribbit = frog.friendBoost / 100 * frog.ribbit + frog.ribbit;
    }
    const attributes = this.getFrogAttributes(frog, ribbit, frog.rarity);
    let metadata: Metadata = {
      name: frog.name,
      description: frog.description,
      image: `${this.froggyGatewayUrl}/${frog.cid2d}`,
      image3d: `${this.froggyGatewayUrl}/${frog.cid3d}`,
      imagePixel: `${this.froggyGatewayUrl}/${frog.cidPixel}`,
      edition: frog.edition,
      date: frog.date,
      ribbit: frog.ribbit,
      rarity: frog.rarity,
      attributes: attributes
    };
    return metadata;
  }

  async getItem(itemId: number): Promise<ItemMetadata> {
    const item = await this.itemService.getItem(itemId);
    const attributes = this.getItemAttributes(item);

    let metadata: ItemMetadata = {
      name: item.name,
      description: item.description,
      image: item.image,
      attributes: attributes
    };
    return metadata;
  }

  getFrogAttributes(frog: Frog, ribbit: number, rarity: string): Attribute[] {
    let attributes: Attribute[] = [];
    if (frog.isOneOfOne) {
      attributes.push({ trait_type: '1 of 1', value: frog.oneOfOne });
    } else {
      attributes.push({ trait_type: "Background", value: frog.background });
      attributes.push({ trait_type: "Body", value: frog.body });
      attributes.push({ trait_type: "Eyes", value: frog.eyes });
      attributes.push({ trait_type: "Mouth", value: frog.mouth });
      attributes.push({ trait_type: "Shirt", value: frog.shirt });
      attributes.push({ trait_type: "Hat", value: frog.hat });
    }
    attributes.push({ trait_type: 'Rarity', value: rarity});
    attributes.push({ trait_type: 'Ribbit Per Day', value: ribbit});
    attributes.push({ trait_type: 'Paired', value: frog.isPaired ? 'Yes' : 'No'});
    if (frog.isPaired) {
      attributes.push({ trait_type: 'Friend', value: frog.friendName });
    }
    return attributes;
  }

  getItemAttributes(item: Item): Attribute[] {
    let attributes: Attribute[] = [];

    attributes.push({ trait_type: 'Trait', value: item.isTrait ? 'Yes' : 'No'});

    if (item.isTrait) {
      attributes.push({ trait_type: 'Trait Name', value: item.name});
      attributes.push({ trait_type: 'Trait Category', value: item.traitLayer});
    }

    if (item.isBoost) {
      attributes.push({ trait_type: 'Friend Origin', value: item.isFriend ? 'Genesis' : 'Collab'});
      attributes.push({ trait_type: 'Ribbit Boost', value: item.percent, display_type: "boost_percentage" });
      attributes.push({ trait_type: 'Boost', value: item.isBoost ? 'Yes' : 'No'});
    }
    attributes.push({ trait_type: 'Rarity', value: item.rarity});
    attributes.push({ trait_type: 'Category', value: item.category});
    attributes.push({ trait_type: 'Physical', value: item.isPhysical ? 'Yes' : 'No'});
    attributes.push({ trait_type: 'Allowlist', value: item.isAllowlist ? 'Yes' : 'No'});
    attributes.push({ trait_type: 'Merch', value: item.isPhysical ? 'Yes' : 'No'});

    return attributes;
  }
}
