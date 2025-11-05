import { Injectable } from "@nestjs/common";
import { IGeneralResponse } from "src/common/intrfaces/IGeneralResponse";
import { Repository } from "typeorm";

import { TaskStatus } from "./task-status.entity";
import { ICreateTaskStatusRequest } from "./task-status.models";

@Injectable()
export class TaskStatusService {
    constructor (
        private readonly _taskStatusRepository: Repository<TaskStatus>
    ) {}

    public async getAll(): Promise<IGeneralResponse<TaskStatus[] | null>> {
        try {
            const statuses: TaskStatus[] = await this._taskStatusRepository.find();
            if (statuses.length === 0) {
                return {
                    data: null,
                    errors: ['Unable to find task statuses']
                };
            }
            return {
                data: statuses,
                errors: []
            };
        } catch (error: any) {
            return {
                data: null,
                errors: [error.message]
            };
        }
    }

    public async create(data: ICreateTaskStatusRequest): Promise<IGeneralResponse<TaskStatus | null>> {
        try {
            const entity: TaskStatus = this._taskStatusRepository.create(data.filter);
            const status: TaskStatus = await this._taskStatusRepository.save(entity);
            return {
                data: status,
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