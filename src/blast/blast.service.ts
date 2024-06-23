import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MetadataService } from "src/metadata/metadata.service";
import { Metadata } from "src/models/Metadata";
import { Repository } from "typeorm";
import { BlastFrog } from "./blast.entity";
import { Frog } from "src/frog/frog.entity";

@Injectable()
export class BlastService {

  constructor(
    @InjectRepository(BlastFrog) private blastFrogRepo: Repository<BlastFrog>,

    private readonly metadataService: MetadataService
  ) {}

  async getPixelFrog(frogId: number): Promise<Metadata> {
    const frog = await this.blastFrogRepo.findOneBy({ edition: frogId });
    return this.metadataService.blastFrogToMetadata(frog);
  }
}