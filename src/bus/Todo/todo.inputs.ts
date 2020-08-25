// Core
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

@InputType()
export class TodoCreateInput {
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    text: string;
}

@InputType()
export class TodoUpdateInput {
    @Field(() => Boolean)
    @IsNotEmpty()
    @IsBoolean()
    isCompleted: boolean;
}
