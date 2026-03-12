import {
    Inject,
    Injectable,
    NotFoundException
} from "@nestjs/common";
import { TASK_DEADLINE_REPOSITORY } from "src/common/constants";
import {
    DeepPartial,
    Repository
} from "typeorm";

import { TaskDeadline } from "./task-deadline.entity";

@Injectable()
export class TaskDeadlineService {
    constructor (
        @Inject(TASK_DEADLINE_REPOSITORY)
        private readonly _taskDeadlineRepository: Repository<TaskDeadline>
    ) {}

    public async getAll(): Promise<TaskDeadline[]> {
        const diadlines: TaskDeadline[] = await this._taskDeadlineRepository.find();
        if (diadlines.length === 0) {
            throw new NotFoundException('Task deadlines not found');
        }
        return diadlines;
    }

    public async create(filter: DeepPartial<TaskDeadline>): Promise<TaskDeadline> {
        const entity: TaskDeadline = this._taskDeadlineRepository.create(filter);
        return await this._taskDeadlineRepository.save(entity);
    }
}