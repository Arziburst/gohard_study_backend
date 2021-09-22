// Core
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Instruments
import { Message, MessageDocument } from './message.entity';
import { MessageCreateInput, MessageUpdateInput } from './message.inputs';

@Injectable()
export class MessageService {
    constructor(@InjectModel('Message') private readonly messageModel: Model<MessageDocument>) { }

    // ================================================================================================================

    async createOne(body: MessageCreateInput): Promise<Message> {
        const newLesson = new this.messageModel(body);

        return await newLesson.save();
    }

    // ================================================================================================================

    async findAll(): Promise<Message[]> {
        return await this.messageModel.find();
    }

    // ================================================================================================================

    async findOne(messageId: string): Promise<Message> {
        const message = await this.messageModel.findById(messageId);

        if (!message) {
            throw new BadRequestException('Message does not exist');
        }

        return message;
    }

    // ================================================================================================================

    async updateOne(messageId: string, body: MessageUpdateInput): Promise<Message | null> {
        return await this.messageModel.findByIdAndUpdate(messageId, body, { new: true });
    }

    // ================================================================================================================

    async deleteOne(messageId: string): Promise<boolean> {
        try {
            await this.messageModel.findByIdAndDelete(messageId);

            return true;
        } catch (error) {
            return false;
        }
    }

    // ================================================================================================================

    async dropCollection(): Promise<boolean> {
        try {
            await this.messageModel.collection.drop();

            return true;
        } catch (error) {
            return false;
        }
    }
}
