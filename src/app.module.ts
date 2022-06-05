import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import appConfig from './config/app';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from "./rtc";
import { WebRTCModule, WebRTCService } from './webrtc';
import { DbModule } from './db';
import { UserModule } from './user';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static', 'peer-to-server'),
      serveRoot: '/static'
    }),
    EventsModule,
    WebRTCModule,
    DbModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
