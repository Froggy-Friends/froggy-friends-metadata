import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Frog } from './frog.entity';
import { MetadataService } from 'src/metadata/metadata.service';
import { Metadata } from 'src/models/Metadata';

@Injectable()
export class FrogService {
  constructor(
    @InjectRepository(Frog) private frogRepo: Repository<Frog>,
    private metadataService: MetadataService,
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

  async getFrog(frogId: number): Promise<Metadata> {
    const frog = await this.findOne(frogId);
    return this.metadataService.frogToMetadata(frog);
  }

  async getAllFrogs(): Promise<any[]> {
    const frogs = await this.findAll();
    return frogs.map((frog) => this.metadataService.frogToSimpleMetadata(frog));
  }
}
