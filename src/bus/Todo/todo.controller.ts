// Core
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    HttpCode,
    HttpStatus,
    Body,
    BadRequestException,
    Param,
} from '@nestjs/common';

// Entities
import { Todo } from './todo.entity';

// Services
import { TodoService } from './todo.service';

// Instruments
import { TodoCreateInput, TodoUpdateInput } from './todo.inputs';

@Controller('todos')
export class TodoController {
    // eslint-disable-next-line max-params
    constructor(
        private readonly todoService: TodoService,
    ) {}

    // ================================================================================================================

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    async createTodo(@Body() body: TodoCreateInput): Promise<Todo> {
        return await this.todoService.createOne(body);
    }

    // ================================================================================================================

    @Get()
    @HttpCode(HttpStatus.OK)
    async todos(): Promise<Todo[]> {
        const todos = await this.todoService.findAll();

        return todos.reverse();
    }

    // ================================================================================================================

    @Put('/:todoId')
    @HttpCode(HttpStatus.OK)
    async updateTodo(
        @Body() body: TodoUpdateInput,
        @Param('todoId') todoId: string, // eslint-disable-line @typescript-eslint/indent
    ): Promise<Todo> {
        const todo = await this.todoService.findOne(todoId);

        if (!todo) {
            throw new BadRequestException('Todo does not exist');
        }

        return await this.todoService.updateOne(todo, body);
    }

    // ================================================================================================================

    @Delete('/:todoId')
    @HttpCode(HttpStatus.OK)
    async deleteTodo(
        @Param('todoId') todoId: string,
    ): Promise<Boolean> {
        return await this.todoService.deleteOne(todoId);
    }
}
