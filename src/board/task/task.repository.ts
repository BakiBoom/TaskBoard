import {
    DeepPartial,
    Repository,
    UpdateResult
} from "typeorm";

import { Task } from "./task.entity";

export class TaskRepository extends Repository<Task> {
    public async createRecord(filter: DeepPartial<Task>): Promise<Task | null> {
        try {
            return await this.save(this.create(filter));
        } catch {
            return null;
        }
    }

    public async updateRecord(entity: Task, filter: DeepPartial<Task>): Promise<UpdateResult | null> {
        try {
            return await this.update({ id: entity.id }, filter);
        } catch {
            return null;
        }
    }

    public async getById(value: bigint): Promise<Task | null> {
        try {
            return await this.findOne({
                where: {
                    id: value,
                },
            });
        } catch {
            return null;
        }
    }
}
