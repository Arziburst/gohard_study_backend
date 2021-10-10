// Core
import { IsString } from 'class-validator';

export class MessageCreateInput {
    @IsString()
    text: string;

    @IsString()
    username: string;
}


export class MessageUpdateInput {
    @IsString()
    text: string;
}
