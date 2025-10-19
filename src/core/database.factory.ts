import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Attachment } from "src/attachment/attachment.entity";
import { Board } from "src/board/board.entity";
import { TaskDeadline } from "src/board/task/task-deadlines/task-deadline.entity";
import { TaskStatus } from "src/board/task/task-status/task-status.entity";
import { Task } from "src/board/task/task.entity";
import { Role } from "src/user/role/role.entity";
import { UserBoards } from "src/user/user-boards/user-boards.entity";
import { User } from "src/user/user.entity";

export const getTypeOrmConnfig = (
    configService: ConfigService
): TypeOrmModuleOptions => {
    const isDevelopment = configService.get('app.environment') === 'dev';

    return {
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [
            Attachment,
            User,
            Board,
            Task,
            TaskStatus,
            TaskDeadline,
            Role,
            UserBoards
        ],
        synchronize: isDevelopment,
        logging: isDevelopment,
        migrationsRun: !isDevelopment
    };
};