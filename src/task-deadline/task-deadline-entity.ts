import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity('task_deadlines')
export class TaskDeadline extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'title',
        type: 'varchar',
        length: 50,
        nullable: false
    })
    title: string;
}