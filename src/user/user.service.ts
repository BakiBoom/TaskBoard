import {
    Inject,
    Injectable,
    NotFoundException
} from "@nestjs/common";
import { Board } from "src/board/board.entity";
import { BoardService } from "src/board/board.service";
import { USER_REPOSITORY } from "src/common/constants";
import {
    DeepPartial,
    Repository
} from "typeorm";

import { UserBoards } from "./user-boards/user-boards.entity";
import { UserBoardsService } from "./user-boards/user-boards.service";
import { User } from "./user.entity";
import { IUserProfile } from "./user.models";

@Injectable()
export class UserService {
    constructor (
        private readonly _userBoardsService: UserBoardsService,
        private readonly _boardService: BoardService,
        @Inject(USER_REPOSITORY)
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

    //TODO добавить метод обновления пользователя с учетом его аватара
    //TODO добавить метод удаления пользователя (не точно)
}
