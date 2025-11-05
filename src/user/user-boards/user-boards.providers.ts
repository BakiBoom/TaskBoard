import {
    DATA_SOURCE,
    USER_BOARDS_REPOSITORY,
} from "src/common/constants";
import { DataSource } from "typeorm";

import { UserBoards } from "./user-boards.entity";

export const taskStatusProviders = [{
    provide: USER_BOARDS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserBoards),
    inject: [DATA_SOURCE],
}];