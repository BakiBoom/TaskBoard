import { Attachment } from "src/attachment/attachment-entity";
import { Board } from "src/board/board-entity";
import { Task } from "src/task/task-entity";
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
    
    @ManyToMany(() => Board, board => board.users)
    @JoinTable()
    boards: Board[];
    
    @ManyToMany(() => Attachment, attachment => attachment.users)
    @JoinTable()
    avatars: Attachment[];

    @ManyToMany(() => UserRole, role => role.users)
    @JoinTable()
    roles: UserRole[];

    @ManyToMany(() => Task, task => task.executors)
    tasks: Task[];

    @CreateDateColumn({
        name: 'create_date'
    })
    createDate: string;
}