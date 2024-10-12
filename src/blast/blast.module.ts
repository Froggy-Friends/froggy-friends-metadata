import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlastFrog } from './blast.entity';
import { BlastController } from './blast.controller';
import { BlastService } from './blast.service';
import { MetadataModule } from '../metadata/metadata.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlastFrog]), MetadataModule],
  controllers: [BlastController],
  providers: [BlastService],
  exports: [TypeOrmModule],
})
export class BlastFrogModule {}
