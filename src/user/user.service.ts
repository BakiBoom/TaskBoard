import {
    Injectable,
    NotFoundException
} from "@nestjs/common";
import { Board } from "src/board/board.entity";
import { BoardService } from "src/board/board.service";
import {
    DeepPartial,
    DeleteResult,
    Repository
} from "typeorm";

import { UserBoards } from "./user-boards/user-boards.entity";
import { UserBoardsService } from "./user-boards/user-boards.service";
import { User } from "./user.entity";
import { IUserProfile } from "./user.models";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
    constructor (
        private readonly _userBoardsService: UserBoardsService,
        private readonly _boardService: BoardService,
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>,
    ) {}

    public async getByEmail(email: string): Promise<User> {
        const user: User | null = await this._userRepository.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            throw new NotFoundException(`Could not find user with email: "${email}".`);
        }
        return user;
    }

    public async getById(id: bigint, profile?: boolean): Promise<User | IUserProfile> {
        const user: User | null = await this._userRepository.findOne({
            where: {
                id: id
            }
        });
        if (!user) {
            throw new NotFoundException(`Could not find user with id: "${id}".`);
        }
        if (!profile) {
            return user;
        }
        const userBoards: UserBoards[] = await this._userBoardsService.getByUserId(id);
        if (userBoards.length === 0) {
            throw new NotFoundException(`Couldn't find any boards for user id: "${id}".`);
        }
        const boardIds: bigint[] = userBoards.map(item => item.board.id);
        const boards: Board[] = await this._boardService.getByIds(boardIds);
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            avatars: [], //NOTE пока пустой так как не реализована работа с вложениями,
            boards: boards
        };
    }

    public async create(filter: DeepPartial<User>): Promise<User> {
        const entity: User = this._userRepository.create(filter);
        return await this._userRepository.save(entity);
    }

    public async update(id: bigint, username: string): Promise<boolean> {
        const user: User | null = await this._userRepository.findOne({
            where: {
                id: id
            }
        });
        if (!user) {
            throw new NotFoundException(`Couldn't find user id: "${id}".`);
        }
        user.username = username;
        await this._userRepository.save(user);
        return true;
    }

    public async remove(id: bigint): Promise<boolean> {
        //NOTE Возможно тут нужна была бы транзакция бд, для прерывания отмены всех пройденых операций
        const deleteResultUB: boolean = await this._userBoardsService.removeByUserId(id);
        if (deleteResultUB) {
            const deleteResult: DeleteResult = await this._userRepository.delete({
                id: id
            });
            if (deleteResult.affected && deleteResult.affected > 0) {
                return true;
            }
            throw new NotFoundException('The record was not found or the data has not deleted.');
        }
        return false;
    }
}
