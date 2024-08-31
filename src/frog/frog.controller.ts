import { Controller, Get, Param } from '@nestjs/common';
import { Metadata } from '../models/Metadata';
import { FrogService } from './frog.service';
import { baseFrogs } from './baseFrogs';
import { ethFrogs, Snapshot } from './ethFrogs';
import { teamFrogs } from './team';
import { tadpoles } from './tadpoles';

@Controller('frog')
export class FrogController {
  constructor(private readonly frogService: FrogService) {}

  @Get('/snapshot')
  getSnapshot() {
    const combinedEthFrogs: Snapshot[] = [];

    // combine eth frogs with base frogs
    for (const frog of ethFrogs) {
      const matchingBaseFrog = baseFrogs.find((f) => f.wallet === frog.wallet);

      if (matchingBaseFrog) {
        frog.count += matchingBaseFrog.count;
        frog.onBase = true;
      }

      combinedEthFrogs.push(frog);
    }

    // add leftover base frogs
    for (const baseFrog of baseFrogs) {
      const matchingFrog = combinedEthFrogs.find(
        (f) => f.wallet === baseFrog.wallet,
      );
      if (!matchingFrog) {
        combinedEthFrogs.push(baseFrog);
      }
    }

    const masterList: Snapshot[] = [];

    for (const tadpole of tadpoles) {
      const frog = combinedEthFrogs.find((f) => f.wallet === tadpole.wallet);

      if (frog) {
        // count extra tadpoles
        const roleReward = this.getRoleReward(frog.count);
        tadpole.count += roleReward;

        if (frog.onBase) {
          tadpole.count += 3;
        }
      }

      masterList.push(tadpole);
    }

    // frogs with no tadpoles
    for (const frog of combinedEthFrogs) {
      const match = masterList.find((f) => f.wallet === frog.wallet);

      if (!match) {
        const roleReward = this.getRoleReward(frog.count);

        const tadpole: Snapshot = {
          wallet: frog.wallet,
          count: roleReward,
        };

        if (frog.onBase) {
          tadpole.count += 3;
        }

        masterList.push(tadpole);
      }
    }

    return {
      totalHolders: masterList.length,
      tadpoles: masterList.sort((a, b) => b.count - a.count),
    };
  }

  getRoleReward(count: number) {
    if (count <= 1) {
      return 1;
    } else if (count >= 2 && count <= 4) {
      return 2;
    } else if (count >= 5 && count <= 9) {
      return 4;
    } else if (count >= 10 && count <= 19) {
      return 6;
    } else if (count >= 20) {
      return 8;
    } else {
      return 0;
    }
  }

  @Get('/all')
  getEthMetadata(): Promise<Metadata[]> {
    return this.frogService.getAllFrogs();
  }

  @Get('/:id')
  getFrog(@Param('id') frogId: number): Promise<Metadata> {
    return this.frogService.getFrog(frogId);
  }
}
