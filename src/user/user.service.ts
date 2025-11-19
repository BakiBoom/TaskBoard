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
