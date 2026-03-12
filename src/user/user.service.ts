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