import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import postgresql from "../config/postgresql";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [postgresql],
    }),
  ],
  providers: [{
    provide: DbService,
    useValue: new DbService(new ConfigService())
  }],
  exports: [DbService]
})
export class DbModule {}
