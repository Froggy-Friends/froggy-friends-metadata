import { Injectable } from '@nestjs/common';
import { Tadpole } from './tadpole.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from 'src/models/Attribute';
import { TadpoleMetadata } from 'src/models/TadpoleMetadata';

@Injectable()
export class TadpoleService {
  constructor(
    @InjectRepository(Tadpole) private tadpoleRepo: Repository<Tadpole>,
  ) {}

  async createTadpole(tadpole: Tadpole) {
    const tadpoleInstance = this.tadpoleRepo.create();

    tadpoleInstance.tokenId = tadpole.tokenId;
    tadpoleInstance.name = tadpole.name;
    tadpoleInstance.description = tadpole.description;
    tadpoleInstance.imageUrl = tadpole.imageUrl;
    tadpoleInstance.background = tadpole.background;
    tadpoleInstance.skin = tadpole.skin;
    tadpoleInstance.clothing = tadpole.clothing;
    tadpoleInstance.face = tadpole.face;
    tadpoleInstance.hat = tadpole.hat;
    tadpoleInstance.accessories = tadpole.accessories;
    tadpoleInstance.createdAt = tadpole.createdAt;
    tadpoleInstance.updatedAt = tadpole.updatedAt;

    const saved = await this.tadpoleRepo.save(tadpoleInstance);
    return saved;
  }

  async findTadpole(tokenId: number) {
    return await this.tadpoleRepo.findOne({ where: { tokenId }});
  }

  tadpoleToMetadata(tadpole: Tadpole) {
    const attributes: Attribute[] = [];
    attributes.push({ trait_type: 'Background', value: tadpole.background });
    attributes.push({ trait_type: 'Skin', value: tadpole.skin });
    attributes.push({ trait_type: 'Face', value: tadpole.face });
    
    if (tadpole.clothing) {
      attributes.push({ trait_type: 'Clothing', value: tadpole.clothing });
    }
    if (tadpole.hat) {
      attributes.push({ trait_type: 'Hat', value: tadpole.hat });
    }
    if (tadpole.accessories) {
      attributes.push({ trait_type: 'Accessories', value: tadpole.accessories });
    }

    const metadata: TadpoleMetadata = {
      name: tadpole.name,
      description: tadpole.description,
      image: tadpole.imageUrl,
      attributes,
    };
    return metadata;
  }
}
