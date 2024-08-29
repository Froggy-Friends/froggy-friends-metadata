import { Injectable } from '@nestjs/common';
import { Tadpole } from './tadpole.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
}
