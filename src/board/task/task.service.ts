import {
    Inject,
    Injectable
} from "@nestjs/common";
import { TASK_REPOSITORY } from "src/common/constants";
import { IResult } from "src/common/intrfaces/IProcessing";
import { User } from "src/user/user.entity";
import {
    DeepPartial,
    DeleteResult,
    Repository,
    UpdateResult
} from "typeorm";

import { Task } from "./task.entity";

@Injectable()
export class TaskService {
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly _taskRepository: Repository<Task>,
    ) {}

    public async create(title: string, description: string, deadlineDate: string, boardId: bigint, deadlineId: bigint, statusId: bigint, authorId: bigint, executorIds: bigint[]): Promise<IResult<Task>> {
        try {
            if (executorIds.length <= 0) {
                return {
                    error: 'The performers are not specified'
                };
            }
            const executorFromUserIds: DeepPartial<User>[] = executorIds.map(item => ({id: item}));
            const entity: Task = this._taskRepository.create({
                title: title,
                description: description,
                deadlineDate: deadlineDate,
                board: {id: boardId},
                author: {id: authorId},
                deadline: {id: deadlineId},
                status: {id: statusId},
                executors: executorFromUserIds,
            });
            const task: Task = await this._taskRepository.save(entity);
            return {
                result: task,
                error: null
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }

    public async remove(id: bigint): Promise<IResult<bigint>> {
        try {
            const deleteResult: DeleteResult = await this._taskRepository.delete({id: id});
            if (deleteResult.affected && deleteResult.affected > 0) {
                return {
                    result: id,
                    error: null
                };
            }
            return {
                error: 'The record was not found or the data has not deleted.'
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }

    public async update(id: bigint, filter: DeepPartial<Task>): Promise<IResult<bigint>> {
        try {
            const updateResult: UpdateResult = await this._taskRepository.update({id: id}, filter);
            if (updateResult.affected && updateResult.affected > 0) {
                return {
                    result: id,
                    error: null
                };
            }
            return {
                error: 'The record was not found or the data has not changed.'
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }

    public async getByBoardId(id: bigint): Promise<IResult<Task[]>> {
        try {
            const tasks: Task[] = await this._taskRepository.find({
                where: {
                    board: {id: id}
                },
                relations: {
                    deadline: true,
                    status: true,
                    author: true,
                    executors: true,
                    attachments: true
                }
            });
            if (tasks.length === 0) {
                return {
                    error: `Unable to find any tasks for the board^ ${id}`
                };
            }
            return {
                result: tasks,
                error: null
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }

    public async removeByBoardId(id: bigint): Promise<IResult<bigint>> {
        try {
            const deleteResult: DeleteResult = await this._taskRepository.delete({ board: {id: id} });
            if (deleteResult.affected && deleteResult.affected > 0) {
                return {
                    result: id,
                    error: null
                };
            }
            return {
                error: 'The record was not found or the data has not deleted.'
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }
}