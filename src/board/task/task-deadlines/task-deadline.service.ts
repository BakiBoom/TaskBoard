import {
    Inject,
    Injectable
} from "@nestjs/common";
import { TASK_DEADLINE_REPOSITORY } from "src/common/constants";
import { IResult } from "src/common/intrfaces/IProcessing";
import {
    DeepPartial,
    Repository
} from "typeorm";

import { TaskDeadline } from "./task-deadline.entity";

@Injectable()
export class TaskDeadlineService {
    constructor (
        @Inject(TASK_DEADLINE_REPOSITORY)
        private readonly _taskStatusRepository: Repository<TaskDeadline>
    ) {}

    public async getAll(): Promise<IResult<TaskDeadline[]>> {
        try {
            const statuses: TaskDeadline[] = await this._taskStatusRepository.find();
            if (statuses.length === 0) {
                return {
                    error: 'Unable to find task statuses'
                };
            }
            return {
                result: statuses,
                error: null
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }

    public async create(filter: DeepPartial<TaskDeadline>): Promise<IResult<TaskDeadline | null>> {
        try {
            const entity: TaskDeadline = this._taskStatusRepository.create(filter);
            const status: TaskDeadline = await this._taskStatusRepository.save(entity);
            return {
                result: status,
                error: null
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }
}