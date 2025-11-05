import { IFilter } from "src/common/intrfaces/IProcessing";

import { Task } from "./task.entity";

export interface ICreateTaskRequest {
    title: string;
    description: string;
    deadlineDate: string;
    boardId: bigint;
    dedlineId: bigint;
    statusId: bigint;
    authorId: bigint;
    executorIds: bigint[];
};

export interface IUpdateTaskRequest extends IFilter<Task> {
    id: bigint;
};

export interface IRemoveTaskRequest {
    id: bigint;
}