export interface ICreateTaskRequest {
    title: string;
    description: string;
    deadlineDate: string;
    boardId: bigint;
    deadlineId: bigint;
    statusId: bigint;
    authorId: bigint;
    executorIds: bigint[];
};