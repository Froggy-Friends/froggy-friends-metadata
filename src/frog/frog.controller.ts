import { Controller, Get, Param } from "@nestjs/common";
import { Chain } from "src/app.controller";
import { Metadata } from "src/models/Metadata";
import { FrogService } from "./frog.service";

@Controller('frog')
export class FrogController {

  constructor(private readonly frogService: FrogService) {}

  @Get('/all')
  getEthMetadata(): Promise<Metadata[]> {
    return this.frogService.getAllFrogs(Chain.Ethereum);
  }

  @Get('/:id')
  getFrog(@Param('id') frogId: number): Promise<Metadata> {
    return this.frogService.getFrog(frogId);
  }
}