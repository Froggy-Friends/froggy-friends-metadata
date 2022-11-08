import { Injectable } from '@nestjs/common';
import { Frog } from './frog/frog.entity';
import { FrogService } from './frog/frog.service';
import { Attribute } from './models/Attribute';
import { Metadata } from './models/Metadata';
import * as rarity from './data/rarity.json';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private froggyGatewayUrl: string;

  constructor(private readonly frogService: FrogService, private readonly config: ConfigService) {
    this.froggyGatewayUrl = config.get<string>('IPFS_URL');
  }

  async getFrog(frogId: number): Promise<Metadata> {
    const frog = await this.frogService.findOne(frogId);
    const attributes = this.getFrogAttributes(frog);
    let metadata: Metadata = {
      name: frog.name,
      description: frog.description,
      image: `${this.froggyGatewayUrl}/${frog.cid2d}`,
      image3d: `${this.froggyGatewayUrl}/${frog.cid3d}`,
      imagePixel: `${this.froggyGatewayUrl}/${frog.cidPixel}`,
      edition: frog.edition,
      date: frog.date,
      attributes: attributes
    };
    return metadata;
  }

  getFrogAttributes(frog: Frog): Attribute[] {
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
    let rarity = this.getFrogRarity(frog.edition);
    let ribbit = this.getFrogRibbit(frog);
    attributes.push({ trait_type: 'Rarity', value: rarity});
    attributes.push({ trait_type: 'Ribbit Per Day', value: ribbit});
    attributes.push({ trait_type: 'Paired', value: frog.isPaired ? 'Yes' : 'No'});
    if (frog.isPaired) {
      attributes.push({ trait_type: 'Friend', value: frog.friendName });
    }
    return attributes;
  }

  getFrogRarity(frogId: number): string {
    if (rarity.common.includes(frogId)) {
      return "Common";
    } else if (rarity.uncommon.includes(frogId)) {
      return "Uncommon";
    } else if (rarity.rare.includes(frogId)) {
      return "Rare";
    } else if (rarity.legendary.includes(frogId)) {
      return "Legendary";
    } else if (rarity.epic.includes(frogId)) {
      return "Epic";
    } else {
      return "Common";
    }
  }

  getFrogRibbit(frog: Frog): number {
    let ribbit = 20;
    if (rarity.common.includes(frog.edition)) {
      ribbit = 20;
    } else if (rarity.uncommon.includes(frog.edition)) {
      ribbit = 30;
    } else if (rarity.rare.includes(frog.edition)) {
      ribbit = 40;
    } else if (rarity.legendary.includes(frog.edition)) {
      ribbit = 75;
    } else if (rarity.epic.includes(frog.edition)) {
      ribbit = 150;
    }

    if (frog.isPaired && frog.friendBoost) {
      ribbit = frog.friendBoost / 100 * ribbit + ribbit;
    }
    return ribbit;
  }
}
