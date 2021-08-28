// Core
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

// App
import { AppModule } from './app.module';
// import { getConnectionManager } from 'typeorm';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('PORT') ?? 4000;

    // getConnectionManager()
    //     .get('default')
    //     .runMigrations();

    app.set('trust proxy', 1);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: [
            'http://localhost',
            'http://localhost:3000', // dev
            'http://localhost:5000', // dev
            'http://localhost:5500', // dev
            'https://gohardstudy.gq', // prod
        ],
        credentials: true,
    });

    await app.listen(port);

    Logger.log(`🚀 Server running on http://localhost:${port}`, 'NestApplication');
}

bootstrap();
