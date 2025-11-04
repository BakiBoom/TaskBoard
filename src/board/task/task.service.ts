import { Injectable } from "@nestjs/common";
import { IGeneralResponse } from "src/common/intrfaces/IGeneralResponse";
import { User } from "src/user/user.entity";
import {
    DeepPartial,
    DeleteResult,
    Repository,
    UpdateResult
} from "typeorm";

import { Task } from "./task.entity";
import { ICreateTaskRequest } from "./task.models";

@Injectable()
export class TaskService {
    constructor(
        private readonly _taskRepository: Repository<Task>,
    ) {}

    public async create(data: ICreateTaskRequest): Promise<IGeneralResponse<Task | null>> {
        try {
            if (data.executorIds.length <= 0) {
                return {
                    data: null,
                    errors: ['The performers are not specified']
                };
            }
            const executorIds: DeepPartial<User>[] = data.executorIds.map(item => ({id: item}));
            const entity: Task = this._taskRepository.create({
                title: data.title,
                description: data.description,
                deadlineDate: data.deadlineDate,
                board: {id: data.boardId},
                author: {id: data.authorId},
                deadline: {id: data.dedlineId},
                status: {id: data.statusId},
                executors: executorIds,
            });
            const task: Task = await this._taskRepository.save(entity);
            return {
                data: task,
                errors: []
            };
        } catch (error: any) {
            return {
                data: null,
                errors: [error.message]
            };
        }
    }

    public async remove(id: bigint) {
        try {
            const deleteResult: DeleteResult = await this._taskRepository.delete({id: id});
            if (deleteResult.affected && deleteResult.affected > 0) {
                return {
                    data: id,
                    errors: []
                };
            }
            return {
                data: null,
                errors: ['The record was not found or the data has not deleted.']
            };
        } catch (error: any) {
            return {
                data: null,
                errors: [error.message]
            };
        }
    }

    public async update(id: bigint, filter: DeepPartial<Task>): Promise<IGeneralResponse<bigint | null>> {
        try {
            const updateResult: UpdateResult = await this._taskRepository.update({id: id}, filter);
            if (updateResult.affected && updateResult.affected > 0) {
                return {
                    data: id,
                    errors: []
                };
            }
            return {
                data: null,
                errors: ['The record was not found or the data has not changed.']
            };
        } catch (error: any) {
            return {
                data: null,
                errors: [error.message]
            };
        }
    }
}