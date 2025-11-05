import {
    DATA_SOURCE,
    TASK_STATUS_REPOSITORY,
} from "src/common/constants";
import { DataSource } from "typeorm";

import { TaskStatus } from "./task-status.entity";

export const taskStatusProviders = [{
    provide: TASK_STATUS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TaskStatus),
    inject: [DATA_SOURCE],
}];