// Core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Instruments
import { Todo } from './todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
    imports:     [ TypeOrmModule.forFeature([ Todo ]) ],
    providers:   [ TodoService ],
    controllers: [ TodoController ],
    exports:     [ TodoService ],
})
export class TodoModule {}
