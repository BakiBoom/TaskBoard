import { Injectable } from "@nestjs/common";
import {
    IResult,
    IUserForBoard
} from "src/common/intrfaces/IProcessing";
import {
    DeepPartial,
    DeleteResult,
    Repository
} from "typeorm";

import { Role } from "../role/role.entity";
import { RoleService } from "../role/role.service";

import { UserBoards } from "./user-boards.entity";
import { IRemoveUserBoard } from "./user-boards.models";

@Injectable()
export class UserBoardsService {
    constructor (
        private readonly _roleService: RoleService,
        private readonly _userBoardRepository: Repository<UserBoards>,
    ) {}

    public async getByMasterId(id: bigint): Promise<IResult<UserBoards[]>> {
        const role: IResult<Role> = await this._roleService.getById(id); //TODO чет б*я не то
        if (role.error) {
            return {
                error: role.error
            };
        }
        try {
            const result: UserBoards[] = await this._userBoardRepository.find({
                where: {
                    user: {id: id},
                    role: {id: role.result?.id}
                },
                relations: {
                    role: true,
                    board: true,
                    user: true
                }
            });
            if (result.length === 0) {
                return {
                    error: `Unable to find records for master with id: ${id}`
                };
            }
            return {
                result: result,
                error: null
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }

    public async getByBoardId(id: bigint): Promise<IResult<UserBoards[]>> {
        try {
            const result: UserBoards[] = await this._userBoardRepository.find({
                where: {
                    board: {id: id}
                },
                relations: {
                    role: true,
                    board: true,
                    user: true,
                }
            });
            if (result.length === 0) {
                return {
                    error: `Unable to find records for board with id: ${id}`
                };
            }
            return {
                result: result,
                error: null
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }

    public async getByUserId(id: bigint): Promise<IResult<UserBoards[]>> {
        try {
            const result: UserBoards[] = await this._userBoardRepository.find({
                where: {
                    user: {id: id}
                },
                relations: {
                    role: true,
                    board: true,
                    user: true
                }
            });
            if (result.length === 0) {
                return {
                    error: `Unable to find records for user with id: ${id}`
                };
            }
            return {
                result: result,
                error: null
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }

    public async create(boardId: bigint, users: IUserForBoard[]): Promise<IResult<UserBoards[]>> {
        try {
            const filter: DeepPartial<UserBoards>[] = users.map(item => ({user: {id: item.userId}, role: {id: item.roleId}, board: {id: boardId}}));
            const entities: UserBoards[] = this._userBoardRepository.create(filter);
            const userBoards: UserBoards[] = await this._userBoardRepository.save(entities);
            if (userBoards.length === 0) {
                return {
                    error: `Unable to create user records for the board: ${boardId}`
                };
            }
            return {
                result: userBoards,
                error: null
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }

    public async removeUserByBoardId(boardId: bigint, userId: bigint): Promise<IResult<IRemoveUserBoard>> {
        try {
            const deleteResult: DeleteResult = await this._userBoardRepository.delete({
                user: {id: userId},
                board: {id: boardId}
            });
            if (deleteResult.affected && deleteResult.affected > 0) {
                return {
                    result: {
                        userId: userId,
                        boardId: boardId
                    },
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

    public async removeByBoardId(boardId: bigint): Promise<IResult<bigint>> {
        try {
            const deleteResult: DeleteResult = await this._userBoardRepository.delete({ board: {id: boardId} });
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