import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Item } from "./item.entity";
import { ContractMetadata } from './../models/ContractMetadata';
import { Attribute } from "src/models/Attribute";

@Injectable()
export class ItemService {

  constructor(@InjectRepository(Item) private itemRepo: Repository<Item>) {

  }

  async getItem(id: number): Promise<Item> {
    const item = await this.itemRepo.findOneBy({ id: id });
    const attributes = this.getItemAttributes(item);
    item.attributes = attributes;
    return item;
  }

  getContractMetadata(): ContractMetadata {
    return {
      name: 'Ribbit Items',
      description: 'The official Froggy Friends - Ribbit Prime items',
      image: 'https://froggyfriends.mypinata.cloud/ipfs/QmWTpDVCUewNUS3Rix4rCV1GmMUDF9E8EbAtBZMDztjohh',
      external_link: 'https://froggyfriendsnft.com/market',
      seller_fee_basis_points: 1000,
      fee_recipient: '0x6b01aD68aB6F53128B7A6Fe7E199B31179A4629a'
    };
  }

  private getItemAttributes(item: Item): Attribute[] {
    let attributes: Attribute[] = [];

    attributes.push({ trait_type: 'Rarity', value: item.rarity});
    attributes.push({ trait_type: 'Boost', value: item.isBoost ? 'Yes' : 'No'});
    attributes.push({ trait_type: 'Allowlist', value: item.isAllowlist ? 'Yes' : 'No'});
    attributes.push({ trait_type: 'Trait', value: item.isTrait ? 'Yes' : 'No'});
    attributes.push({ trait_type: 'Physical', value: item.isPhysical ? 'Yes' : 'No'});
    attributes.push({ trait_type: 'Community', value: item.isCommunity ? 'Yes' : 'No'});
    if (item.isBoost) {
      attributes.push({ trait_type: 'Boost Percentage', value: item.boost, display_type: 'boost_percentage'});
      attributes.push({ trait_type: 'Friend Origin', value: item.friendOrigin});
    }
    if (item.isTrait) {
      attributes.push({ trait_type: 'Trait Type', value: item.traitLayer});
    }
    return attributes;
  }
}