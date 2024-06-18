import { Injectable } from '@nestjs/common';
import { Frog } from './frog/frog.entity';
import { FrogService } from './frog/frog.service';
import { Attribute } from './models/Attribute';
import { Metadata } from './models/Metadata';
import { ConfigService } from '@nestjs/config';
import { Item } from './item/item.entity';
import { ItemService } from './item/item.service';
import { ItemMetadata } from './item/item.metadata';
import { Asset } from './models/Asset';
import { MetadataStandard } from './models/MetadataStandard';
import { MetadataExtensions } from './models/MetadataExtensions';
import { AssetType } from './models/AssetType';
import { MediaType } from './models/MediaType';
import { MimeType } from './models/MimeType';
import { Chain } from './app.controller';

@Injectable()
export class AppService {
  private froggyGatewayUrl: string;
  private modelsUrl: string;

  constructor(
    private readonly frogService: FrogService,
    private readonly itemService: ItemService,
    private readonly config: ConfigService,
  ) {
    this.froggyGatewayUrl = this.config.get<string>('IPFS_URL');
    this.modelsUrl = this.config.get<string>('MODELS_URL');
  }

  async getAllFrogs(chain: Chain): Promise<Metadata[]> {
    let metadata: Metadata[] = [];

    if (chain === Chain.Ethereum) {
      const frogs = await this.frogService.findAll();
      metadata = frogs.map((frog) => {
          const attributes = this.getFrogAttributes(frog, frog.ribbit, frog.rarity);
          return {
              name: frog.name,
              image: `${this.froggyGatewayUrl}/${frog.cid2d}`,
              edition: frog.edition,
              attributes: attributes,
          };
      });
    }

    return metadata;
  }

  private frogToMetadata(frog: Frog): Metadata {
    const attributes = this.getFrogAttributes(frog, frog.ribbit, frog.rarity);
    const assets = this.getAssets();
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

  private frogToPixelMetadata(frog: Frog): Metadata {
    const attributes = this.getFrogAttributes(frog, frog.ribbit, frog.rarity);
    const assets = this.getAssets();
    return {
      name: frog.name,
      description: frog.description,
      image: `${this.froggyGatewayUrl}/${frog.cidPixel}`,
      edition: frog.edition,
      date: frog.date,
      rarity: frog.rarity,
      attributes: attributes,
      assets: assets,
    };
  }

  async getPixelFrog(frogId: number): Promise<Metadata> {
    const frog = await this.frogService.findOne(frogId)
    return this.frogToPixelMetadata(frog)
  }

  async getFrog(frogId: number): Promise<Metadata> {
    const frog = await this.frogService.findOne(frogId);
    return this.frogToMetadata(frog);
  }

  private getAssets() {
    const assets: Asset[] = [
      {
        asset_type: AssetType.avatar,
        media_type: MediaType.model,
        files: [
          {
            name: 'Fonzy',
            description: 'Play as Fonzy on Nifty Island.',
            url: `${this.modelsUrl}/Fonzy.glb`,
            file_type: MimeType.modelGlb,
          },
        ],
      },
      {
        asset_type: AssetType.avatar,
        media_type: MediaType.model,
        files: [
          {
            name: 'Ollie',
            description: 'Play as Ollie on Nifty Island.',
            url: `${this.modelsUrl}/Ollie.glb`,
            file_type: MimeType.modelGlb,
          },
        ],
      },
      {
        asset_type: AssetType.avatar,
        media_type: MediaType.model,
        files: [
          {
            name: 'Cole',
            description: 'Play as Cole on Nifty Island.',
            url: `${this.modelsUrl}/Cole.glb`,
            file_type: MimeType.modelGlb,
          },
        ],
      },
      {
        asset_type: AssetType.avatar,
        media_type: MediaType.model,
        files: [
          {
            name: 'Will',
            description: 'Play as Will on Nifty Island.',
            url: `${this.modelsUrl}/Will.glb`,
            file_type: MimeType.modelGlb,
          },
        ],
      },
    ];
    return assets;
  }

  async getItem(itemId: number): Promise<ItemMetadata> {
    const item = await this.itemService.getItem(itemId);
    const attributes = this.getItemAttributes(item);

    const metadata: ItemMetadata = {
      name: item.name,
      description: item.description,
      image: item.image,
      attributes: attributes,
    };
    return metadata;
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
