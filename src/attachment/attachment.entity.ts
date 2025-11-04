import { Task } from "src/board/task/task.entity";
import { User } from "src/user/user.entity";
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
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'bigint'
    })
    id: bigint;

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

    @Column({
        name: 'token',
        type: 'text',
        nullable: false,
        unique: true
    })
    token: string;

    @ManyToMany(() => User, user => user.avatars)
    users: User[];

    @ManyToMany(() => Task, task => task.attachments)
    tasks: Task[];

    @CreateDateColumn({
        name: 'create_date'
    })
    createDate: string;
}