import {InjectRepository} from "@nestjs/typeorm";
import {
    DeepPartial,
    Repository,
    UpdateResult
} from "typeorm";

import { User } from "./user.entity";

export class UserRepository {

    constructor(
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>
    ) {}

    public async createRecord(filter: DeepPartial<User>): Promise<User | null> {
        try {
            return await this._userRepository.save(this._userRepository.create(filter));
        } catch(err: any) {
            console.log("Error creating record repository", err);
            return null;
        }
    }

    public async updateRecord(entity: User, filter: DeepPartial<User>): Promise<UpdateResult | null> {
        try {
            return await this._userRepository.update({ id: entity.id }, filter);
        } catch {
            return null;
        }
    }

    public async getById(value: bigint): Promise<User | null> {
        try {
            return await this._userRepository.findOne({
                where: {
                    id: value,
                }
            });
        } catch {
            return null;
        }
    }

    public async getByUsername(value: string): Promise<User | null> {
        try {
            return await this._userRepository.findOne({
                where: {
                    username: value,
                }
            });
        } catch {
            return null;
        }
    }

    public async getByEmail(value: string): Promise<User | null> {
        try {
            return await this._userRepository.findOne({
                where: {
                    email: value,
                }
            });
        } catch {
            return null;
        }
    }

    public async deleteRecord(id: bigint): Promise<boolean> {
        try {
            await this._userRepository.delete({
                id: id
            });
            return true;
        } catch(error: any) {
            console.log("Error deleting user record repository", error);
            return false;
        }
    }
}
