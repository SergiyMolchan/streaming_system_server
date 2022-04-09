import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WsAdapter } from './ws.adapter';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
  );

  app.useWebSocketAdapter(new WsAdapter(app.getHttpServer()));
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidUnknownValues: true,
        stopAtFirstError: true,
      }),
  );

  await app.listen(app.get(ConfigService).get('port'), app.get(ConfigService).get('host'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();