import { Injectable, Param, UnauthorizedException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './entities/todo.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoModel: typeof Todo ) {}


  async create(dto: CreateTodoDto, user) {
    const todo = await this.todoModel.create({
      title: dto.title, user_id: user.id
    })

    return todo
  }
  async findAll() {
    const todo = await this.todoModel.findAll({
      attributes: ["id", "title"],
      include: [
        {
          model: User, as: "user",
          attributes: ["id", "name", "email"]
        }
      ]
    })

    return todo;
  }

  async findOne(id: number) {
    const todo = await this.todoModel.findOne({where: {
      id
    }})

    return todo;
  }

  async update(id: number, dto: UpdateTodoDto, user) {
    const todo = await this.todoModel.update({ title: dto.title }, { 
      where: {
        id,
        user_id: user.id
      }
    })

    if (todo[0] >= 1) { 
      return { 
        message: "Todo atualizado com sucesso!"
      }
    } else if (todo[0] === 0){
      return {
        message: "Algo deu errado. Verifique se esse item existe ou se foi voce quem o criou."
      }
    }
    
  } // Somente o usuário que cria faz o update, se o usuário que chamou pra fazer o update nao for o usuário que criou o todo, lançar um error
  // O que acontece se o todo nao existir? Como prevenir o update de um todo que nao existe?

  async remove(id: number, user) {
    const todo = await this.todoModel.destroy({ where: { id, user_id: user.id } })
 
    if (todo === 1) {
      return {
        message: "Item removido com sucesso."
      }
    } else {
      return {
        message: "Algo deu errado. Verifique se esse item existe ou se foi voce quem o criou."
      }
    } // Somente o usuário que criou pode deletar, O que acontece se o todo nao existir? Como prevenir o remove de um todo que nao existe? E se o usuário for deletado?
  } 
}
