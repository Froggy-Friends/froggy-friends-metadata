import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Frog } from './frog.entity';
import { Chain } from 'src/app.controller';
import { MetadataService } from 'src/metadata/metadata.service';

@Injectable()
export class FrogService {
  constructor(
    @InjectRepository(Frog) private frogRepo: Repository<Frog>,
    private metadataService: MetadataService
  ) {}

  findAll(): Promise<Frog[]> {
    return this.frogRepo.find();
  }

  findOne(edition: number): Promise<Frog> {
    return this.frogRepo.findOneBy({ edition: edition });
  }

  async saveFrog(frog: Frog): Promise<Frog> {
    return await this.frogRepo.save(frog);
  }

  async getAllFrogs(chain: Chain): Promise<any[]> {
    let metadata = [];

    if (chain === Chain.Ethereum) {
      const frogs = await this.findAll();
      metadata = frogs.map((frog) => this.metadataService.frogToSimpleMetadata(frog));
    }
    return metadata;
  }
}
