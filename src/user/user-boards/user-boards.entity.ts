import { Board } from "src/board/board.entity";
import {
    BaseEntity,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";

import { Role } from "../role/role.entity";
import { User } from "../user.entity";

@Entity('user_boards')
export class UserBoards extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'bigint'
    })
    id: bigint;

    @ManyToOne(() => User)
    @JoinColumn({
        name: 'user_id'
    })
    user: User;

    @ManyToOne(() => Role)
    @JoinColumn({
        name: 'role_id'
    })
    role: Role;

    @ManyToOne(() => Board)
    @JoinColumn({
        name: 'board_id'
    })
    board: Board;
}