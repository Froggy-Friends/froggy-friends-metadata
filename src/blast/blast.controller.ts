import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { Metadata } from "../models/Metadata";
import { BlastService } from "./blast.service";

@Controller('blast')
export class BlastController {
  
  constructor(private readonly blastService: BlastService) {}

  @Get('/frog/:id')
  getBlastFrog(@Param('id') frogId: number): Promise<Metadata> {
    if (frogId < 0 || frogId > 4443) throw new BadRequestException('Token ID out of range');
    return this.blastService.getPixelFrog(frogId);
  }
}
