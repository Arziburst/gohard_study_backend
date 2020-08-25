// Core
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Modules
import { DatabaseModule } from './database/database.module';
import { TodoModule } from './bus/Todo/todo.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        TodoModule,
    ],
})
export class AppModule {}
