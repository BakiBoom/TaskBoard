import { Attachment } from "src/attachment/attachment.entity";
import { Board } from "src/board/board.entity";
import { TaskDeadline } from "src/task-deadline/task-deadline.entity";
import { TaskStatus } from "src/task-status/task-status.entity";
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
        type: 'datetime',
        length: 6,
        nullable: true
    })
    deadlineDate: string;

    @ManyToOne(() => Board)
    @JoinColumn({
        name: 'board_id',
    })
    board: Board

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
    authorId: number;

    @ManyToMany(() => User)
    @JoinTable({
        name: 'executors'
    })
    executors: User[];

    @ManyToMany(() => Attachment)
    @JoinTable()
    attachments: Attachment[];

    @CreateDateColumn({
        name: 'create_date'
    })
    createDate: string;
}