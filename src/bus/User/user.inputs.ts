// Core
import { IsString } from 'class-validator';

export class UserLoginInput {
    @IsString()
    username: string;
}

export class UserRegisterInput {
    @IsString()
    username: string;
}


export class UserUpdateInput {
    @IsString()
    username: string;
}
