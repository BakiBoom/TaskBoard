import {
    Injectable,
    BadRequestException,
    NotFoundException
} from "@nestjs/common";
import { User } from "src/user/user.entity";
import {
    DeepPartial,
    DeleteResult,
    Repository,
    UpdateResult
} from "typeorm";

import { Task } from "./task.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly _taskRepository: Repository<Task>,
    ) {}

    public async create(
        title: string,
        description: string,
        deadlineDate: string,
        boardId: bigint,
        deadlineId: bigint,
        statusId: bigint,
        authorId: bigint,
        executorIds: bigint[]
    ): Promise<Task> {
        if (executorIds.length <= 0) {
            throw new BadRequestException('The performers are not specified. Field "executorIds" is empty.');
        }
        const executorFromUserIds: DeepPartial<User>[] = executorIds.map(item => ({ id: item }));
        const entity: Task = this._taskRepository.create({
            title: title,
            description: description,
            deadlineDate: deadlineDate,
            board: { id: boardId },
            author: { id: authorId },
            deadline: { id: deadlineId },
            status: { id: statusId },
            executors: executorFromUserIds,
        });
        return await this._taskRepository.save(entity);
    }

    public async remove(id: bigint): Promise<bigint> {
        const deleteResult: DeleteResult = await this._taskRepository.delete({ id: id });
        if (deleteResult.affected && deleteResult.affected > 0) {
            return id;
        }
        throw new NotFoundException('The record was not found or the data has not deleted.');
    }

    public async update(id: bigint, filter: DeepPartial<Task>): Promise<bigint> {
        const updateResult: UpdateResult = await this._taskRepository.update({ id: id }, filter);
        if (updateResult.affected && updateResult.affected > 0) {
            return id;
        }
        throw new NotFoundException('The record was not found or the data has not changed.');
    }

    public async getByBoardId(id: bigint): Promise<Task[]> {
        const tasks: Task[] = await this._taskRepository.find({
            where: {
                board: { id: id }
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
            throw new NotFoundException(`Unable to find any tasks for the board: ${id}.`);
        }
        return tasks;
    }

    public async removeByBoardId(id: bigint): Promise<boolean> {
        const deleteResult: DeleteResult = await this._taskRepository.delete({ board: { id: id } });
        if (deleteResult.affected && deleteResult.affected > 0) {
            return true;
        }
        throw new NotFoundException('The record was not found or the data has not deleted.');
    }
}