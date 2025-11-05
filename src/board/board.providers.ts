import {
    BOARD_REPOSITORY,
    DATA_SOURCE,
} from "src/common/constants";
import { DataSource } from "typeorm";

import { Board } from "./board.entity";

export const taskStatusProviders = [{
    provide: BOARD_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Board),
    inject: [DATA_SOURCE],
}];