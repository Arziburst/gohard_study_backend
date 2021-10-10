
// Core
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    versionKey: false,
})
export class User {
    @Prop({ required: true, unique: true })
    username: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
