import { Controller, Get, Param } from "@nestjs/common";
import { Metadata } from "src/models/Metadata";
import { BlastService } from "./blast.service";

@Controller('blast')
export class BlastController {
  
  constructor(private readonly blastService: BlastService) {}

  @Get('/frog/:id')
  getBlastFrog(@Param('id') frogId: number): Promise<Metadata> {
    return this.blastService.getPixelFrog(frogId);
  }
}
