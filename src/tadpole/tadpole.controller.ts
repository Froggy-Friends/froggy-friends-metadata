import { Controller, Get } from "@nestjs/common";
import { TadpoleMetadata } from "src/models/TadpoleMetadata";


@Controller('tadpole')
export class TadpoleController {

  @Get('/:id')
  getTadpole(): TadpoleMetadata {
    return {
      name: 'Tadpoles',
      description: 'The official ERC404 Collection of Froggy Friends',
      image:
        'https://froggyfriends.mypinata.cloud/ipfs/QmWqdzCvPYyifzoPYiwehm1gkGLiYVFzWDYz9o3n7nLHMG',
      attributes: [],
    };
  }
}