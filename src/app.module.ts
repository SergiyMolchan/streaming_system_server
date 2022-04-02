import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RtcGateway } from "./rtc/rtc.gateway";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    RtcGateway,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
