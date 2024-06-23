import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Frog } from './frog/frog.entity';
import { FrogModule } from './frog/frog.module';
import { FrogService } from './frog/frog.service';
import { Item } from './item/item.entity';
import { ItemModule } from './item/item.module';
import { BaseFrog } from './base/base.entity';
import { BaseFrogModule } from './base/base.module';
import { MetadataModule } from './metadata/metadata.module';
import { MetadataService } from './metadata/metadata.service';
import { TadpoleModule } from './tadpole/tadpole.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>('DB_HOST'),
        port: 5432,
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: 'postgres',
        schema: configService.get<string>('DB_SCHEMA'),
        entities: [Frog, Item, BaseFrog]
      }),
      inject: [ConfigService]
    }),
    MetadataModule,
    FrogModule,
    ItemModule,
    BaseFrogModule,
    TadpoleModule
  ],
  controllers: [AppController],
  providers: [AppService, MetadataService, FrogService],
})
export class AppModule {}
