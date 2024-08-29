import { Module } from '@nestjs/common';
import { TadpoleController } from './tadpole.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tadpole } from './tadpole.entity';
import { TadpoleService } from './tadpole.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tadpole])],
  controllers: [TadpoleController],
  providers: [TadpoleService],
  exports: [],
})
export class TadpoleModule {}
