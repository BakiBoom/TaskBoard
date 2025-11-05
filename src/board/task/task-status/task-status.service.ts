import {
    Inject,
    Injectable
} from "@nestjs/common";
import { TASK_STATUS_REPOSITORY } from "src/common/constants";
import { IResult } from "src/common/intrfaces/IProcessing";
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

    public async getAll(): Promise<IResult<TaskStatus[]>> {
        try {
            const statuses: TaskStatus[] = await this._taskStatusRepository.find();
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

    public async create(filter: DeepPartial<TaskStatus>): Promise<IResult<TaskStatus | null>> {
        try {
            const entity: TaskStatus = this._taskStatusRepository.create(filter);
            const status: TaskStatus = await this._taskStatusRepository.save(entity);
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