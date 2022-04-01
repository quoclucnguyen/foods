import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { graphqlUploadExpress } from 'graphql-upload';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 30 }));
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors();
  initializeApp({
    credential: applicationDefault()
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
