import { Attachment } from "src/attachment/attachment.entity";
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
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'bigint'
    })
    id: bigint;

    @Column({
        name: 'username',
        type: 'text',
        nullable: false,
        unique: true
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
        nullable: false,
        unique: true
    })
    email: string;

    @ManyToMany(() => Attachment)
    @JoinTable()
    avatars: Attachment[];

    @CreateDateColumn({
        name: 'create_date'
    })
    createDate: string;
}