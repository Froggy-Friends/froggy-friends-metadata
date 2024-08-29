import { Controller, Get, Param, Post } from '@nestjs/common';
import { TadpoleMetadata } from '../models/TadpoleMetadata';
import { Tadpole } from './tadpole.entity';
import { TadpoleService } from './tadpole.service';

@Controller('tadpole')
export class TadpoleController {
  private readonly baseUrl: string;

  constructor(private readonly tadpoleService: TadpoleService) {
    this.baseUrl =
      'https://rm3inbdi31qlcik4.public.blob.vercel-storage.com/tadpoles';
  }

  @Post('/create')
  async createTadpoles() {
    const tadpole = new Tadpole();
    tadpole.tokenId = 7777;
    tadpole.name = 'Tadpoles #7777';
    tadpole.description = 'Official ERC404 collection of Froggy Friends';
    tadpole.imageUrl = `${this.baseUrl}/${7777}.png`;
    tadpole.background = 'Bronze';
    tadpole.skin = 'Bronze';
    tadpole.face = 'Bronze';

    tadpole.createdAt = new Date();
    tadpole.updatedAt = new Date();

    const saved = await this.tadpoleService.createTadpole(tadpole);

    return saved;
  }

  @Get('/:id')
  getTadpole(@Param('id') id: string): TadpoleMetadata {
    const metadata = {
      name: `Tadpole #${id}`,
      description: 'The official ERC404 Collection of Froggy Friends',
      image: `https://rm3inbdi31qlcik4.public.blob.vercel-storage.com/tadpoles/${id}.png`,
      attributes: [],
    };

    // get tadpoles from database

    return metadata;
  }
}
