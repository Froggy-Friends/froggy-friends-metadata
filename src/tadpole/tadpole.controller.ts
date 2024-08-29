import { Controller, Get, Param } from '@nestjs/common';
import { TadpoleMetadata } from '../models/TadpoleMetadata';
import { TadpoleService } from './tadpole.service';
import { Attribute } from 'src/models/Attribute';

@Controller('tadpole')
export class TadpoleController {

  constructor(private readonly tadpoleService: TadpoleService) {
    
  }

  @Get('/:id')
  async getTadpole(@Param('id') id: string): Promise<TadpoleMetadata> {
    const tadpole = await this.tadpoleService.findTadpole(+id);
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
