import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from './guard/auth.guard';
import { Auth } from 'src/users/decorators/auth.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}


  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Auth() user: User) {
    return this.todoService.create(createTodoDto, user);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto, @Auth() user: User) {
    return this.todoService.update(+id, dto, user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Auth() user: User) {
    return this.todoService.remove(+id, user);
  }
}
