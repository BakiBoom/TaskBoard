import { Task } from "src/task/task-entity";
import { User } from "src/user/user-entity";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity('attachments')
export class Attachment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'filename',
        type: 'text',
        nullable: false
    })
    filename: string;
    
    @Column({
        name: 'mime',
        type: 'varchar',
        length: 20,
        nullable: false
    })
    mime: string;

    @Column({
        name: 'path',
        type: 'text',
        nullable: false
    })
    path: string;
    
    @ManyToMany(() => Task, task => task.attachments)
    tasks: Task[];
    
    @ManyToMany(() => User, user => user.avatars)
    users: User[];

    @CreateDateColumn({
        name: 'create_date'
    })
    createDate: string;
}