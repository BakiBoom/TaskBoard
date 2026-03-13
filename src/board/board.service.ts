import {
    Injectable,
    NotFoundException
} from "@nestjs/common";
import { UserBoards } from "src/user/user-boards/user-boards.entity";
import { IUserRole } from "src/user/user-boards/user-boards.models";
import { UserBoardsService } from "src/user/user-boards/user-boards.service";
import {
    DeepPartial,
    DeleteResult,
    Repository,
    In
} from "typeorm";

import { Board } from "./board.entity";
import { IBoardInfo } from "./board.models";
import { Task } from "./task/task.entity";
import { TaskService } from "./task/task.service";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BoardService {
    constructor(
        private readonly _taskService: TaskService,
        private readonly _userBoardsService: UserBoardsService,
        @InjectRepository(Board)
        private readonly _boardRepository: Repository<Board>
    ) {}

    public async create(users: IUserRole[], filter: DeepPartial<Board>): Promise<Board> {
        const boardEntity: Board = this._boardRepository.create(filter);
        const board: Board = await this._boardRepository.save(boardEntity);
        await this._userBoardsService.create(board.id, users);
        return board;
    }

    public async getById(id: bigint): Promise<IBoardInfo> {
        const board: Board | null = await this._boardRepository.findOne({
            where: {
                id: id
            }
        });
        if (!board) {
            throw new NotFoundException(`Could not find board with id: ${id}.`);
        }
        const userBoards: UserBoards[] = await this._userBoardsService.getByBoardId(board.id);
        const tasks: Task[] = await this._taskService.getByBoardId(board.id);
        return {
            board: board,
            userBoards: userBoards,
            tasks: tasks
        };
    }

    public async getByIds(ids: bigint[]): Promise<Board[]> {
        const boards: Board[] = await this._boardRepository.find({
            where: {
                id: In(ids)
            }
        });
        if (!boards || boards.length === 0) {
            throw new NotFoundException(`Could not find boards with ids: ${ids}.`);
        }
        return boards;
    }

    public async remove(boardId: bigint): Promise<boolean> {
        await this._taskService.removeByBoardId(boardId);
        await this._userBoardsService.removeByBoardId(boardId);
        const deleteResult: DeleteResult = await this._boardRepository.delete({ id: boardId });
        if (deleteResult.affected && deleteResult.affected > 0) {
            return true;
        }
        throw new NotFoundException( 'The record was not found or the data has not deleted.');
    }
}