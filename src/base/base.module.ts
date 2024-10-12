import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseFrog } from './base.entity';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';
import { MetadataModule } from '../metadata/metadata.module';

@Module({
  imports: [TypeOrmModule.forFeature([BaseFrog]), MetadataModule],
  controllers: [BaseController],
  providers: [BaseService],
  exports: [TypeOrmModule],
})
export class BaseFrogModule {}
