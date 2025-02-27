import { Table, Column, Model, AllowNull, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";

@Table({
    tableName: 'todolist',
    underscored: true,
})

export class Todo extends Model {
    
    @AllowNull(false)
    @Column
    title: string;

    @ForeignKey(() => User)
    @Column
    user_id: number;

    @BelongsTo(() => User)
    user: User;

}
