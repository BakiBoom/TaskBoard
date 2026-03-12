import {
    Inject,
    Injectable,
    NotFoundException
} from "@nestjs/common";
import { TASK_STATUS_REPOSITORY } from "src/common/constants";
import {
    DeepPartial,
    Repository
} from "typeorm";

import { TaskStatus } from "./task-status.entity";

@Injectable()
export class TaskStatusService {
    constructor (
        @Inject(TASK_STATUS_REPOSITORY)
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