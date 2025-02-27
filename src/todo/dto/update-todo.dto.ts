import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {

    @IsString()
    @IsNotEmpty()
    title: string;

}
