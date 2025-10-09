import { DeepPartial, Repository, UpdateResult } from "typeorm";
import { User } from "./user.entity";

export class UserRepository extends Repository<User> {
    public async createRecord(filter: DeepPartial<User>): Promise<User | null> {
        try {
            return await this.save(this.create(filter));
        } catch (error: any) {
            return null;
        }
    }

    public async updateRecord(entity: User, filter: DeepPartial<User>): Promise<UpdateResult | null> {
        try {
            return await this.update({id: entity.id}, filter);
        } catch (error: any) {
            return null;
        }
    }

    public async getById(value: bigint): Promise<User | null> {
        try {
            return await this.findOne({
                where: {
                    id: value
                },
                relations: {
                    roles: true,
                    boards: true
                }
            })
        } catch (error: any) {
            return null;
        }
    }

    public async getByUsername(value: string): Promise<User | null> {
        try {
            return await this.findOne({
                where: {
                    username: value
                },
                relations: {
                    roles: true,
                    boards: true
                }
            })
        } catch (error: any) {
            return null;
        }
    }

    public async getByEmail(value: string): Promise<User | null> {
        try {
            return await this.findOne({
                where: {
                    email: value
                },
                relations: {
                    roles: true,
                    boards: true
                }
            })
        } catch (error: any) {
            return null;
        }
    }
}