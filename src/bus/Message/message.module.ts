// Core
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Instruments
import { MessageSchema } from './message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
    imports:     [ MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]) ],
    providers:   [ MessageService ],
    controllers: [ MessageController ],
    exports:     [ MessageService ],
})
export class MessageModule {}
