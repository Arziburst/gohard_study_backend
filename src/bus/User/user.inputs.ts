// Core
import { IsString } from 'class-validator';

export class UserLoginInput {
    @IsString()
    username: string;

    @IsString()
    password: string
}

export class UserRegisterInput {
    @IsString()
    username: string;

    @IsString()
    password: string
}


export class UserUpdateInput {
    @IsString()
    username: string;

    @IsString()
    password: string
}
