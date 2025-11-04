import { Attachment } from "src/attachment/attachment.entity";
import { Board } from "src/board/board.entity";
import { TaskDeadline } from "src/board/task/task-deadlines/task-deadline.entity";
import { TaskStatus } from "src/board/task/task-status/task-status.entity";
import { User } from "src/user/user.entity";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity('tasks')
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'bigint'
    })
    id: bigint;

    @Column({
        name: 'title',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    title: string;

    @Column({
        name: 'description',
        type: 'text',
        nullable: false
    })
    description: string;

    @Column({
        name: 'deadline_date',
        type: 'date',
        nullable: true
    })
    deadlineDate: string;

    @Column({
        name: 'in_archive',
        type: 'boolean',
        nullable: false,
        default: false
    })
    inArchive: boolean;

    @ManyToOne(() => Board)
    @JoinColumn({
        name: 'board_id',
    })
    board: Board;

    @ManyToOne(() => TaskDeadline)
    @JoinColumn({
        name: 'task_deadline_id'
    })
    deadline: TaskDeadline;

    @ManyToOne(() => TaskStatus)
    @JoinColumn({
        name: 'task_status_id'
    })
    status: TaskStatus;

    @ManyToOne(() => User)
    @JoinColumn({
        name: 'author_id'
    })
    author: User;

    @ManyToMany(() => User, user => user.tasks)
    @JoinTable({
        name: 'executors'
    })
    executors: User[];

    @ManyToMany(() => Attachment, attachment => attachment.tasks)
    @JoinTable({
        name: 'tasks_attachments'
    })
    attachments: Attachment[];

    @CreateDateColumn({
        name: 'create_date'
    })
    createDate: string;
}