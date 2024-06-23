import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { Item } from './item.entity';
import { ItemService } from './item.service';
import { MetadataModule } from 'src/metadata/metadata.module';
import { ItemController } from './item.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    MetadataModule
  ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [TypeOrmModule, ItemService]
})

export class ItemModule {}