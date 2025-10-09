import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity('task_statuses')
export class TaskStatus extends BaseEntity {
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