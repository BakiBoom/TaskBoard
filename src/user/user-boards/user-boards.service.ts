import {
    Injectable,
    NotFoundException,
    InternalServerErrorException
} from "@nestjs/common";
import { MainRoles } from "src/common/Enums/roles";
import {
    DeepPartial,
    DeleteResult,
    Repository
} from "typeorm";

import { Role } from "../role/role.entity";
import { RoleService } from "../role/role.service";

import { UserBoards } from "./user-boards.entity";
import { IUserRole } from "./user-boards.models";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserBoardsService {
    constructor (
        private readonly _roleService: RoleService,
        @InjectRepository(UserBoards)
        private readonly _userBoardRepository: Repository<UserBoards>,
    ) {}

    public async getByMasterId(id: bigint): Promise<UserBoards[]> {
        const role: Role = await this._roleService.getById(MainRoles.MASTER);
        const result: UserBoards[] = await this._userBoardRepository.find({
            where: {
                user: { id: id },
                role: { id: role.id }
            },
            relations: {
                role: true,
                board: true,
                user: true
            }
        });
        if (result.length === 0) {
            throw new NotFoundException(`Unable to find records for master with id: ${id}.`);
        }
        return result;
    }

    public async getByBoardId(id: bigint): Promise<UserBoards[]> {
        const result: UserBoards[] = await this._userBoardRepository.find({
            where: {
                board: { id: id }
            },
            relations: {
                role: true,
                board: true,
                user: true,
            }
        });
        if (result.length === 0) {
            throw new NotFoundException(`Unable to find records for board with id: ${id}.`);
        }
        return result;
    }

    public async getByUserId(id: bigint): Promise<UserBoards[]> {
        const result: UserBoards[] = await this._userBoardRepository.find({
            where: {
                user: { id: id }
            },
            relations: {
                role: true,
                board: true,
                user: true
            }
        });
        if (result.length === 0) {
            throw new NotFoundException(`Unable to find records for user with id: ${id}.`);
        }
        return result;
    }

    public async create(boardId: bigint, userRole: IUserRole[]): Promise<UserBoards[]> {
        const filter: DeepPartial<UserBoards>[] = userRole.map(
            item => ({
                user: { id: item.userId },
                role: { id: item.roleId },
                board: { id: boardId }
            })
        );
        const entities: UserBoards[] = this._userBoardRepository.create(filter);
        const userBoards: UserBoards[] = await this._userBoardRepository.save(entities);
        if (userBoards.length === 0) {
            throw new InternalServerErrorException(`Unable to create user records for the board: ${boardId}.`);
        }
        return userBoards;
    }

    public async removeUserByBoardId(boardId: bigint, userId: bigint): Promise<boolean> {
        const deleteResult: DeleteResult = await this._userBoardRepository.delete({
            user: { id: userId },
            board: { id: boardId }
        });
        if (deleteResult.affected && deleteResult.affected > 0) {
            return true;
        }
        throw new NotFoundException('The record was not found or the data has not deleted.');
    }

    public async removeByBoardId(boardId: bigint): Promise<boolean> {
        const deleteResult: DeleteResult = await this._userBoardRepository.delete({
            board: { id: boardId }
        });
        if (deleteResult.affected && deleteResult.affected > 0) {
            return true;
        }
        throw new NotFoundException('The record was not found or the data has not deleted.');
    }

    public async removeByUserId(userId: bigint): Promise<boolean> {
        const deleteResult: DeleteResult = await this._userBoardRepository.delete({
            user: { id: userId }
        });
        if (deleteResult.affected && deleteResult.affected > 0) {
            return true;
        }
        throw new NotFoundException('The record was not found or the data has not deleted.');
    }
}