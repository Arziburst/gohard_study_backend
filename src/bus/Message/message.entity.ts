
// Core
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: {
        createdAt: true,
        updatedAt: true,
    },
    versionKey: false,
})
export class Message {
    @Prop({ required: true })
    text: string;

    @Prop({ required: true })
    user: string;
}

export type MessageDocument = Message & Document;

export const MessageSchema = SchemaFactory.createForClass(Message);
