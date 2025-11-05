import {
    Inject,
    Injectable
} from "@nestjs/common";
import { BOARD_REPOSITORY } from "src/common/constants";
import {
    IResult,
    IUserForBoard
} from "src/common/intrfaces/IProcessing";
import { UserBoards } from "src/user/user-boards/user-boards.entity";
import { UserBoardsService } from "src/user/user-boards/user-boards.service";
import {
    DeepPartial,
    DeleteResult,
    Repository
} from "typeorm";

import { Board } from "./board.entity";
import { IBoardInfo } from "./board.models";
import { Task } from "./task/task.entity";
import { TaskService } from "./task/task.service";

@Injectable()
export class BoardService {
    constructor(
        private readonly _taskService: TaskService,
        private readonly _userBoardsService: UserBoardsService,
        @Inject(BOARD_REPOSITORY)
        private readonly _boardRepository: Repository<Board>
    ) {}

    public async create(users: IUserForBoard[], filter: DeepPartial<Board>): Promise<IResult<Board>> {
        try {
            const boardEntity: Board = this._boardRepository.create(filter);
            const board: Board = await this._boardRepository.save(boardEntity);
            const userBoards: IResult<UserBoards[]> = await this._userBoardsService.create(board.id, users);
            if (userBoards.error) {
                return {
                    error: userBoards.error
                };
            }
            return {
                result: board,
                error: null
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }

    public async getById(id: bigint): Promise<IResult<IBoardInfo>> {
        try {
            const board: Board | null = await this._boardRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!board) {
                return {
                    error: `Could not find board with id: ${id}`
                };
            }
            const userBoards: IResult<UserBoards[]> = await this._userBoardsService.getByBoardId(board.id);
            if (userBoards.error) {
                return {
                    error: userBoards.error
                };
            }
            const tasks: IResult<Task[]> = await this._taskService.getByBoardId(board.id);
            if (tasks.error) {
                return {
                    error: userBoards.error
                };
            }
            return {
                result: {
                    board: board,
                    userBoards: userBoards.result as UserBoards[],
                    tasks: tasks.result as Task[]
                },
                error: null
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }

    public async remove(boardId: bigint): Promise<IResult<bigint>> {
        const removeTaskResult: IResult<bigint> = await this._taskService.removeByBoardId(boardId);
        if (removeTaskResult.error) {
            return {
                error: removeTaskResult.error
            };
        }
        const removeUserBoardResult: IResult<bigint> = await this._userBoardsService.removeByBoardId(boardId);
        if (removeUserBoardResult.error) {
            return {
                error: removeUserBoardResult.error
            };
        }
        try {
            const deleteResult: DeleteResult = await this._boardRepository.delete({id: boardId});
            if (deleteResult.affected && deleteResult.affected > 0) {
                return {
                    result: boardId,
                    error: null
                };
            }
            return {
                error: 'The record was not found or the data has not deleted.'
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }
}