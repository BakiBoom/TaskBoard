import {
    Injectable,
    NotFoundException
} from "@nestjs/common";
import {
    DeepPartial,
    Repository
} from "typeorm";

import { TaskStatus } from "./task-status.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TaskStatusService {
    constructor (
        @InjectRepository(TaskStatus)
        private readonly _taskStatusRepository: Repository<TaskStatus>
    ) {}

    public async getAll(): Promise<TaskStatus[]> {
        const statuses: TaskStatus[] = await this._taskStatusRepository.find();
        if (statuses.length === 0) {
            throw new NotFoundException('Task deadlines not found');
        }
        return statuses;
    }

    public async create(filter: DeepPartial<TaskStatus>): Promise<TaskStatus> {
        const entity: TaskStatus = this._taskStatusRepository.create(filter);
        return await this._taskStatusRepository.save(entity);
    }
}