import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MetadataService } from "../metadata/metadata.service";
import { Metadata } from "../models/Metadata";
import { Repository } from "typeorm";
import { BlastFrog } from "./blast.entity";
import { Frog } from "../frog/frog.entity";

@Injectable()
export class BlastService {

  constructor(
    @InjectRepository(BlastFrog) private blastFrogRepo: Repository<BlastFrog>,

    private readonly metadataService: MetadataService
  ) {}

  async getPixelFrog(frogId: number): Promise<Metadata> {
    const frog = await this.blastFrogRepo.findOneBy({ edition: frogId });
    if (!frog) throw new BadRequestException('Invalid frog ID');
    return this.metadataService.blastFrogToMetadata(frog);
  }
}