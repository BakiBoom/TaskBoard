import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
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

    @CreateDateColumn({
        name: 'create_date'
    })
    createDate: string;
}