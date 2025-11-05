import {
    DATA_SOURCE,
    ROLE_REPOSITORY,
} from "src/common/constants";
import { DataSource } from "typeorm";

import { Role } from "./role.entity";

export const taskStatusProviders = [{
    provide: ROLE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
    inject: [DATA_SOURCE],
}];