import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}


  async create(dto: CreateUserDto) {
    const users = await this.userModel.findOne({
      where: {
        email: dto.email
      }
    })
    if (users) {
      throw new BadRequestException("Email already exist.")
    }
    const user = await this.userModel.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });

    return user
  }

  async returnuser (user){
    return user
  }
}
