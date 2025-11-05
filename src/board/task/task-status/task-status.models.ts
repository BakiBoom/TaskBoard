import { IFilter } from "src/common/intrfaces/IProcessing";

import { TaskStatus } from "./task-status.entity";

export interface ICreateTaskStatusRequest extends IFilter<TaskStatus> {};