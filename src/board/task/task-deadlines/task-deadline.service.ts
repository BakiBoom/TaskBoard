import { Injectable } from "@nestjs/common";
import { IGeneralResponse } from "src/common/intrfaces/IGeneralResponse";
import { Repository } from "typeorm";

import { TaskDeadline } from "./task-deadline.entity";
import { ICreateTaskDeadlineRequest } from "./task-deadline.models";

@Injectable()
export class TaskDeadlineService {
    constructor (
        private readonly _taskStatusRepository: Repository<TaskDeadline>
    ) {}

    public async getAll(): Promise<IGeneralResponse<TaskDeadline[] | null>> {
        try {
            const statuses: TaskDeadline[] = await this._taskStatusRepository.find();
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

    public async create(data: ICreateTaskDeadlineRequest): Promise<IGeneralResponse<TaskDeadline | null>> {
        try {
            const entity: TaskDeadline = this._taskStatusRepository.create(data.filter);
            const status: TaskDeadline = await this._taskStatusRepository.save(entity);
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