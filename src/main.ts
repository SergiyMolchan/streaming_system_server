import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WsAdapter } from './ws-adapter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
  );

  app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(app.get(ConfigService).get('app.port'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();