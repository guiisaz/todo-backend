import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsString } from 'class-validator';

export class DeleteTodoDto extends PartialType(CreateTodoDto) {

}
