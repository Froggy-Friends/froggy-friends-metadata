import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseFrog } from '../base/base.entity';
import { BlastFrog } from '../blast/blast.entity';
import { Frog } from '../frog/frog.entity';
import { Item } from '../item/item.entity';
import { Asset } from '../models/Asset';
import { AssetType } from '../models/AssetType';
import { Attribute } from '../models/Attribute';
import { MediaType } from '../models/MediaType';
import { Metadata } from '../models/Metadata';
import { MetadataExtensions } from '../models/MetadataExtensions';
import { MetadataStandard } from '../models/MetadataStandard';
import { MimeType } from '../models/MimeType';

@Injectable()
export class MetadataService {
  private froggyGatewayUrl: string;
  private modelsUrl = 'https://froggy-friends-vrms.s3.us-west-1.amazonaws.com';

  constructor(private readonly config: ConfigService) {
    this.froggyGatewayUrl = this.config.get<string>('IPFS_URL');
  }

  baseFrogToMetadata(frog: BaseFrog): Metadata {
    const attributes: Attribute[] = [
      { trait_type: 'Background', value: frog.background },
      { trait_type: 'Body', value: frog.body },
      { trait_type: 'Eyes', value: frog.eyes },
      { trait_type: 'Mouth', value: frog.mouth },
      { trait_type: 'Shirt', value: frog.shirt },
      { trait_type: 'Hat', value: frog.hat },
    ];
    return {
      name: frog.name,
      description: frog.description,
      edition: frog.edition,
      image: frog.image,
      attributes: attributes,
    };
  }

  frogToMetadata(frog: Frog): Metadata {
    const attributes = this.getFrogAttributes(frog, frog.ribbit, frog.rarity);
    const assets = this.getAssets(frog);
    return {
      name: frog.name,
      description: frog.description,
      image: `${this.froggyGatewayUrl}/${frog.cid2d}`,
      image3d: `${this.froggyGatewayUrl}/${frog.cid3d}`,
      imagePixel: `${this.froggyGatewayUrl}/${frog.cidPixel}`,
      edition: frog.edition,
      date: frog.date,
      rarity: frog.rarity,
      attributes: attributes,
      assets: assets,
      metadata_standard: MetadataStandard.etmV1,
      extensions: [
        MetadataExtensions.etmMultiAssetV1,
        MetadataExtensions.etmMultiAttributesV1,
      ],
    };
  }

  blastFrogToMetadata(frog: BlastFrog): Metadata {
    const attributes: Attribute[] = [
      { trait_type: 'Background', value: frog.background },
      { trait_type: 'Body', value: frog.body },
      { trait_type: 'Eyes', value: frog.eyes },
      { trait_type: 'Mouth', value: frog.mouth },
      { trait_type: 'Shirt', value: frog.shirt },
      { trait_type: 'Hat', value: frog.hat },
    ];
    return {
      name: frog.name,
      description: frog.description,
      edition: frog.edition,
      image: frog.image,
      attributes: attributes,
    };
  }

  frogToSimpleMetadata(frog: Frog) {
    const attributes = this.getFrogAttributes(frog, frog.ribbit, frog.rarity);
    return {
      name: frog.name,
      image: `${this.froggyGatewayUrl}/${frog.cid2d}`,
      edition: frog.edition,
      attributes: attributes,
    };
  }

  private getAssets(frog: Frog) {
    const assets: Asset[] = [
      {
        asset_type: AssetType.avatar,
        media_type: MediaType.model,
        files: [
          {
            name: `Froggy Friend #${frog.edition}`,
            description: `Play as Froggy Friend #${frog.edition} on Nifty Island.`,
            url: `${this.modelsUrl}/Froggy_Friend_${frog.edition}.vrm`,
            file_type: MimeType.modelVrm,
          },
        ],
      },
    ];
    return assets;
  }

  getFrogAttributes(frog: Frog, ribbit: number, rarity: string): Attribute[] {
    const attributes: Attribute[] = [];
    if (frog.isOneOfOne) {
      attributes.push({ trait_type: '1 of 1', value: frog.oneOfOne });
    } else {
      attributes.push({ trait_type: 'Background', value: frog.background });
      attributes.push({ trait_type: 'Body', value: frog.body });
      attributes.push({ trait_type: 'Eyes', value: frog.eyes });
      attributes.push({ trait_type: 'Mouth', value: frog.mouth });
      attributes.push({ trait_type: 'Shirt', value: frog.shirt });
      attributes.push({ trait_type: 'Hat', value: frog.hat });
    }
    attributes.push({ trait_type: 'Rarity', value: rarity });
    attributes.push({
      trait_type: 'Paired',
      value: frog.isPaired ? 'Yes' : 'No',
    });
    if (frog.isPaired) {
      attributes.push({ trait_type: 'Friend', value: frog.friendName });
    }
    attributes.push({
      trait_type: 'Upgraded',
      value: frog.isUpgraded ? 'Yes' : 'No',
    });
    return attributes;
  }

  getItemAttributes(item: Item): Attribute[] {
    const attributes: Attribute[] = [];

    attributes.push({
      trait_type: 'Trait',
      value: item.isTrait ? 'Yes' : 'No',
    });

    if (item.isTrait) {
      attributes.push({ trait_type: 'Trait Name', value: item.name });
      attributes.push({ trait_type: 'Trait Category', value: item.traitLayer });
    }

    if (item.isBoost) {
      attributes.push({
        trait_type: 'Friend Origin',
        value: item.isFriend ? 'Genesis' : 'Collab',
      });
      attributes.push({
        trait_type: 'Ribbit Boost',
        value: item.percent,
        display_type: 'boost_percentage',
      });
      attributes.push({
        trait_type: 'Boost',
        value: item.isBoost ? 'Yes' : 'No',
      });
    }
    attributes.push({ trait_type: 'Rarity', value: item.rarity });
    attributes.push({ trait_type: 'Category', value: item.category });
    attributes.push({
      trait_type: 'Physical',
      value: item.isPhysical ? 'Yes' : 'No',
    });
    attributes.push({
      trait_type: 'Allowlist',
      value: item.isAllowlist ? 'Yes' : 'No',
    });
    attributes.push({
      trait_type: 'Merch',
      value: item.isPhysical ? 'Yes' : 'No',
    });

    return attributes;
  }
}
