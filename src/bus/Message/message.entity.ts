
// Core
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message {
    @Prop()
    text: string;
}

export type MessageDocument = Message & Document;

export const MessageSchema = SchemaFactory.createForClass(Message);
