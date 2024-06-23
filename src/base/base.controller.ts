import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { BaseService } from "./base.service";
import { Metadata } from "src/models/Metadata";

@Controller('base')
export class BaseController {

  constructor(private readonly baseService: BaseService) {}

  @Get('/frog/:id')
  getBaseFrog(@Param('id') frogId: number): Promise<Metadata> {
    if (frogId < 0 || frogId > 4443) {
      throw new BadRequestException('Token ID out of range');
    }
    return this.baseService.getFrog(frogId);
  }
}