import { User } from "src/user/user-entity";
import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity('user_role')
export class UserRole extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'title',
        type: 'varchar',
        length: 50,
        nullable: false
    })
    title: string;

    @ManyToMany(() => User, user => user.roles)
    users: User[];
}