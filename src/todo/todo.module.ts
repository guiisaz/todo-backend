import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './entities/todo.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Todo, User]),
   JwtModule.register({
      secret: 'a-very-secure-secret',
      signOptions: {
        expiresIn: '1d',
      },
    })],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoModule]
})
export class TodoModule {}
