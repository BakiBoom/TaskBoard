import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity('task_statuses')
export class TaskStatus extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'bigint'
    })
    id: bigint;

    @Column({
        name: 'title',
        type: 'varchar',
        length: 50,
        nullable: false
    })
    title: string;

    @Column({
        name: 'description',
        type: 'text',
        nullable: false
    })
    description: string;
}