// Core
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Instruments
import { User, UserDocument } from './user.entity';
import { UserLoginInput, UserUpdateInput, UserRegisterInput } from './user.inputs';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }

    // ================================================================================================================

    async createOne(body: UserRegisterInput): Promise<User> {
        const newLesson = new this.userModel(body);

        return await newLesson.save();
    }

    // ================================================================================================================

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    // ================================================================================================================

    async findById(userId: string): Promise<User | null> {
        const user = await this.userModel.findById(userId);

        return user;
    }

    // ================================================================================================================

    async findOneByCredentials({ username }: UserLoginInput): Promise<User | null> {
        const user = await this.userModel.findOne({ username });

        return user;
    }

    // ================================================================================================================

    async updateOne(userId: string, body: UserUpdateInput): Promise<User | null> {
        return await this.userModel.findByIdAndUpdate(userId, body, { new: true });
    }

    // ================================================================================================================

    async deleteOne(userId: string): Promise<boolean> {
        try {
            await this.userModel.findByIdAndDelete(userId);

            return true;
        } catch (error) {
            return false;
        }
    }

    // ================================================================================================================

    async dropCollection(): Promise<boolean> {
        try {
            await this.userModel.collection.drop();

            return true;
        } catch (error) {
            return false;
        }
    }
}
