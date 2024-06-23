import { Module } from "@nestjs/common";
import { TadpoleController } from "./tadpole.controller";

@Module({
  imports: [],
  controllers: [TadpoleController],
  providers: [],
  exports: []
})
export class TadpoleModule {}