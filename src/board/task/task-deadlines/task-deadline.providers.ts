import {
    DATA_SOURCE,
    TASK_DEADLINE_REPOSITORY
} from "src/common/constants";
import { DataSource } from "typeorm";

import { TaskDeadline } from "./task-deadline.entity";

export const taskDeadlineProviders = [{
    provide: TASK_DEADLINE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TaskDeadline),
    inject: [DATA_SOURCE],
}];
