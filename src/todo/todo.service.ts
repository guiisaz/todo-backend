import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './entities/todo.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoModel: typeof Todo,
@InjectModel(User) private userModel: typeof User ) {}


  async create(dto: CreateTodoDto, user) {
    const todo = await this.todoModel.create({
      title: dto.title, user_id: user.id
    });

    const userInstance = await this.userModel.findByPk(user.id)

    try {
    if (userInstance) {
          await this.userModel.update({
      todos: Number(userInstance.todos || 0) + 1
    }, { 
      where: { id: user.id }
    })
    }
  } catch (err) {
    return err
  }

  if (!todo) {
    return {
      message: "Something went wrong. Check if you're correctly logged in or try again later."
    }
  }

    return {
      message: "Item created successfully.",
      todo
    }
  }

  async findAll() {
    const todo = await this.todoModel.findAll({
      attributes: ["id", "title"],
      include: [
        {
          model: User, as: "user",
          attributes: ["id", "name", "email", "todos"]
        }
      ]
    })

    return todo;
  }

  async findOne(id: number) {
    const todo = await this.todoModel.findOne({
      attributes: ["id", "title"],
      include: [
        {
          model: User, as: "user",
          attributes: ["id", "name", "email", "todos"]
        }
      ],
      where: {
      id
    }})

    return todo;
  }

  async update(id: number, dto: UpdateTodoDto, user) {
    const todo = await this.todoModel.update({ 
      title: dto.title 
    }, { 
      where: {
        id,
        user_id: user.id
      }
    })

    if (todo[0] >= 1) { 
      return { 
        message: "Item updated successfully."
      }
    } else if (todo[0] === 0){
      return {
        message: "Something went wrong. Verify if this item really exist or if it belongs to you."
      }
    }
    
  } // Somente o usuário que cria faz o update, se o usuário que chamou pra fazer o update nao for o usuário que criou o todo, lançar um error | Corrigido
  // O que acontece se o todo nao existir? Como prevenir o update de um todo que nao existe? | Corrigido

  async remove(id: number, user) {
    const todo = await this.todoModel.destroy({ where: { id, user_id: user.id } })

    const userInstance = await this.userModel.findByPk(user.id)

    try {
      if (userInstance) {
        await this.userModel.update({
          todos: Number(userInstance.todos) - 1
        }, {
          where: {
            id: user.id
          }
        })
      }
    } catch (err) {
      return err
    }
 
    if (todo === 1) {
      return {
        message: "Item removed successfully."
      }
    } else {
      return {
        message: "Something went wrong. Verify if this item really exist or if it belongs to you."
      }
    } // Somente o usuário que criou pode deletar, O que acontece se o todo nao existir? Como prevenir o remove de um todo que nao existe? E se o usuário for deletado? | Corrigido
  } 
}
