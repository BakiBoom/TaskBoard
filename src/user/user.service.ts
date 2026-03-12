<<<<<<< HEAD
import {
    Inject,
    Injectable,
    NotFoundException
} from "@nestjs/common";
import { USER_REPOSITORY } from "src/common/constants";
import { DeepPartial, Repository } from "typeorm";

import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor (
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

    public async getById(id: bigint): Promise<User> {
        const user: User | null = await this._userRepository.findOne({
            where: {
                id: id
            }
        });
        if (!user) {
            throw new NotFoundException(`Could not find user with id: "${id}".`);
        }
        return user;
    }

    public async create(filter: DeepPartial<User>): Promise<User> {
        const entity: User = this._userRepository.create(filter);
        return await this._userRepository.save(entity);
    }

    //NOTE добавить метод обновления пользователя с учетом его аватара
    //NOTE добавить метод удаления пользователя (не точно)
}
=======
import {Injectable} from '@nestjs/common';
import {IResult} from "src/common/intrfaces/IProcessing";
import {UserBoards} from "src/user/user-boards/user-boards.entity";
import {UserBoardsService} from "src/user/user-boards/user-boards.service";
import {User} from "src/user/user.entity";
import {IUserProfile} from "src/user/user.models";
import {UserRepository} from "src/user/user.repository";
import {DeepPartial} from "typeorm";

@Injectable()
export class UserService {
    constructor(private readonly _userRepository: UserRepository,
                private readonly _userBoardService: UserBoardsService){
    }
    async create(creationData : DeepPartial<User> ): Promise<User | null> {
        try {
            return await this._userRepository.createRecord(creationData);
        }
        catch (error: any) {
            console.log(error);
            return null;
        }
    }

    async update(userId: bigint, updateData: DeepPartial<User>): Promise<User | null> {
        try {
            const user = await this._userRepository.getById(userId);
            if (!user) {
                return null;
            }
            return await this._userRepository.updateRecord(user, updateData) as User | null;
        } catch (error: any) {
            console.log(error);
            return null;
        }
    }

    async getById(id: bigint): Promise<IUserProfile | null> {
        try {
            const user: User | null = await this._userRepository.getById(id);
            if (!user) {
                return null;
            }
            const boards: UserBoards[] | null = await this._userBoardService.getByUserId(id);

            return {
                id: user.id,
                username: user.username,
                email: user.email,
                avatars: user.avatars,
                createDate: user.createDate,
                boards: boards
            };
        }
        catch (error: any) {
            console.log(error);
            return null;
        }
    }

    async delete(id: bigint): Promise<boolean> {
        return this._userRepository.deleteRecord(id);
    }
}
>>>>>>> 43218c8aacfea09308d0d9b457f13c887effc640
