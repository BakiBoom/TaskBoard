import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity('user_roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int'
    })
    id: number;

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

    @CreateDateColumn({
        name: 'create_date',
        nullable: false
    })
    createDate: string;
}