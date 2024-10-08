import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Frog } from './frog/frog.entity';
import { FrogModule } from './frog/frog.module';
import { Item } from './item/item.entity';
import { ItemModule } from './item/item.module';
import { BaseFrog } from './base/base.entity';
import { BaseFrogModule } from './base/base.module';
import { MetadataModule } from './metadata/metadata.module';
import { TadpoleModule } from './tadpole/tadpole.module';
import { BlastFrogModule } from './blast/blast.module';
import { BlastFrog } from './blast/blast.entity';
import { Tadpole } from './tadpole/tadpole.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        schema: configService.get<string>('DB_SCHEMA'),
        database: 'verceldb',
        port: 5432,
        ssl: true,
        entities: [Frog, Item, BaseFrog, BlastFrog, Tadpole],
      }),
      inject: [ConfigService],
    }),
    MetadataModule,
    FrogModule,
    ItemModule,
    BaseFrogModule,
    BlastFrogModule,
    TadpoleModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
