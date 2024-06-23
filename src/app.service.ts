import { Injectable } from '@nestjs/common';
import { FrogService } from './frog/frog.service';
import { Metadata } from './models/Metadata';
import { MetadataService } from './metadata/metadata.service';

@Injectable()
export class AppService {

  constructor(
    private readonly frogService: FrogService,
    private readonly metadataService: MetadataService
  ) {}

  async getPixelFrog(frogId: number): Promise<Metadata> {
    const frog = await this.frogService.findOne(frogId)
    return this.metadataService.frogToPixelMetadata(frog)
  }
}
