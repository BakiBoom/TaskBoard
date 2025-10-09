import { Attachment } from "src/attachment/attachment.entity";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity('boards')
export class Board extends BaseEntity {
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

    @ManyToOne(() => Attachment)
    @JoinColumn({
        name: 'attachment_id'
    })
    attachment: Attachment;

    @CreateDateColumn({
        name: 'create_date'
    })
    createDate: string;
}