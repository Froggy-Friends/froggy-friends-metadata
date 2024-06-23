import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseFrog } from "./base.entity";
import { Repository } from "typeorm";
import { Metadata } from "src/models/Metadata";
import { MetadataService } from "src/metadata/metadata.service";

@Injectable()
export class BaseService {
  constructor(
    @InjectRepository(BaseFrog) private baseFrogRepo: Repository<BaseFrog>,
    private metadataService: MetadataService
  ) {}

  async getFrog(frogId: number): Promise<Metadata> {
    const frog = await this.baseFrogRepo.findOneBy({ edition: frogId });
    if (!frog) throw new BadRequestException('Frog not found');
    return this.metadataService.baseFrogToMetadata(frog);
  }
}