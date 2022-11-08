import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { Frog } from './frog.entity';
import { FrogService } from './frog.service';

@Module({
  imports: [TypeOrmModule.forFeature([Frog])],
  providers: [FrogService],
  exports: [TypeOrmModule, FrogService]
})

export class FrogModule {}