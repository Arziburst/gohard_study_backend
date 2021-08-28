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
import { Message } from './message.entity';

// Services
import { MessageService } from './message.service';

// Instruments
import { MessageCreateInput, MessageUpdateInput } from './message.inputs';

@Controller('messages')
export class MessageController {
    // eslint-disable-next-line max-params
    constructor(
        private readonly messageService: MessageService,
    ) {}

    // ================================================================================================================

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    async createMessage(@Body() body: MessageCreateInput): Promise<Message> {
        return await this.messageService.createOne(body);
    }

    // ================================================================================================================

    @Get()
    @HttpCode(HttpStatus.OK)
    async messages(): Promise<Message[]> {
        const messages = await this.messageService.findAll();

        return messages.reverse();
    }

    // ================================================================================================================

    @Get('/:messageId')
    @HttpCode(HttpStatus.OK)
    async message(
        @Param('messageId') messageId: string, // eslint-disable-line @typescript-eslint/indent
    ): Promise<Message> {
        return await this.messageService.findOne(messageId);
    }

    // ================================================================================================================

    @Put('/:messageId')
    @HttpCode(HttpStatus.OK)
    async updateMessage(
        @Body() body: MessageUpdateInput,
        @Param('messageId') messageId: string, // eslint-disable-line @typescript-eslint/indent
    ): Promise<Message> {
        const message = await this.messageService.findOne(messageId);

        if (!message) {
            throw new BadRequestException('Message does not exist');
        }

        const updatedMessage = await this.messageService.updateOne(messageId, body);

        if (!updatedMessage) {
            throw new BadRequestException('updatedMessage does not exist');
        }

        return updatedMessage;
    }

    // ================================================================================================================

    @Delete('/:messageId')
    @HttpCode(HttpStatus.OK)
    async deleteMessage(
        @Param('messageId') messageId: string,
    ): Promise<Boolean> {
        return await this.messageService.deleteOne(messageId);
    }
}
