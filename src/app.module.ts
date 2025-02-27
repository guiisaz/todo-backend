import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      database: 'sequelize',
      host: 'localhost',
      username: 'todo',
      password: '123',
      logging: (q) => console.log(q),
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
