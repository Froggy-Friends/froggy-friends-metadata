import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Frog } from './frog.entity';
import { FrogService } from './frog.service';
import { MetadataModule } from 'src/metadata/metadata.module';
import { MetadataService } from 'src/metadata/metadata.service';
import { FrogController } from './frog.controller';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [TypeOrmModule.forFeature([Frog]), MetadataModule, ConfigModule],
  controllers: [FrogController],
  providers: [FrogService, MetadataService],
  exports: [TypeOrmModule, FrogService],
})
export class FrogModule {}
