import { Injectable } from "@nestjs/common";
import { IGeneralResponse } from "src/common/intrfaces/IGeneralResponse";
import { Repository } from "typeorm";

import { Board } from "./board.entity";
import { ICreateBoardRequest } from "./board.models";

@Injectable()
export class BoardService {
    constructor(
        private _boardRepository: Repository<Board>,
    ) {}

    public async create(data: ICreateBoardRequest): Promise<IGeneralResponse<Board | null>> {
        try {
            const entity: Board = this._boardRepository.create(data.filter);
            const board: Board = await this._boardRepository.save(entity);
            return {
                data: board,
                errors: []
            };
        } catch (error: any) {
            return {
                data: null,
                errors: [error.message]
            };
        }
    }
}