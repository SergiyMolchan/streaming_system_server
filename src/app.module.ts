import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './config/app';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RtcGateway } from "./rtc";
import { WebrtcService, WebrtcModule } from './webrtc';
import { DbModule } from './db';
import { UserModule } from './user';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    RtcGateway,
    WebrtcModule,
    DbModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, WebrtcService],
})
export class AppModule {}
