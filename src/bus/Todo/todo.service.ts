// Core
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Instruments
import { Todo } from './todo.entity';
import { TodoCreateInput, TodoUpdateInput } from './todo.inputs';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
    ) {}

    // ================================================================================================================

    createOne(input: TodoCreateInput): Promise<Todo> {
        return this.todoRepository.save(input);
    }

    // ================================================================================================================

    findAll(): Promise<Todo[]> {
        return this.todoRepository.find();
    }

    // ================================================================================================================

    async findOne(id: string): Promise<Todo> {
        const todo = await this.todoRepository.findOne(id);

        if (!todo) {
            throw new BadRequestException('Todo does not exist');
        }

        return todo;
    }

    // ================================================================================================================

    updateOne(todo: Todo, body: TodoUpdateInput): Promise<Todo> {
        const data: Partial<Todo> = {
            ...todo,
            ...body,
        };

        return this.todoRepository.save(data);
    }

    // ================================================================================================================

    async deleteOne(id: string): Promise<boolean> {
        try {
            await this.todoRepository.delete(id);

            return true;
        } catch (error) {
            return false;
        }
    }
}
