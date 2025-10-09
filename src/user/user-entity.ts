import { UserRole } from "src/user-role/user-role-entity";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'username',
        type: 'text',
        nullable: false
    })
    username: string;
    
    @Column({
        name: 'password',
        type: 'text',
        nullable: false
    })
    password: string;

    @Column({
        name: 'email',
        type: 'text',
        nullable: false
    })
    email: string;

    @CreateDateColumn({
        name: 'create_date'
    })
    createDate: string;

    @ManyToMany(() => UserRole, role => role.users)
    @JoinTable()
    roles: UserRole[];
}