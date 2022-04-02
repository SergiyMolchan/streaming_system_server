import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RtcService } from "./rtc/rtc.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    RtcService,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
