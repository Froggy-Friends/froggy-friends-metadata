import { Controller, Get } from "@nestjs/common";
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
}