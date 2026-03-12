import { UserBoards } from "src/user/user-boards/user-boards.entity";

import { Board } from "./board.entity";
import { Task } from "./task/task.entity";

export interface IBoardInfo {
    board: Board,
    userBoards: UserBoards[],
    tasks: Task[]
};