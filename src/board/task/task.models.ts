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