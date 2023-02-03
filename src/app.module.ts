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
        entities: [Frog, Item]
      }),
      inject: [ConfigService]
    }),
    FrogModule,
    ItemModule
  ],
  controllers: [AppController],
  providers: [AppService, FrogService],
})
export class AppModule {}
