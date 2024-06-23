import { Module } from "@nestjs/common";
import { MetadataService } from "./metadata.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [MetadataService],
  exports: [MetadataService]
})
export class MetadataModule {}