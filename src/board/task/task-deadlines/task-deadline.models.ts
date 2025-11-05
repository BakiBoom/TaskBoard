import { IFilter } from "src/common/intrfaces/IProcessing";

import { TaskDeadline } from "./task-deadline.entity";

export interface ICreateTaskDeadlineRequest extends IFilter<TaskDeadline> {};