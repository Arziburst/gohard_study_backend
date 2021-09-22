// Core
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Instruments
import { UserSchema } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports:     [ MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]) ],
    providers:   [ UserService ],
    controllers: [ UserController ],
    exports:     [ UserService ],
})
export class UserModule {}
