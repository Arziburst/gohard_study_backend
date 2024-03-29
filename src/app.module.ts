// Core
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Modules
import { DatabaseModule } from './tools/database/database.module';
import { MessageModule } from './bus/Message/message.module';
import { UserModule } from './bus/User/user.module';

// Middlewares
import { AppLoggerMiddleware } from './tools/middlewares/AppLoggerMiddleware';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        MessageModule,
        UserModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}
