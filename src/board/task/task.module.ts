import { Module } from '@nestjs/common';

import { TaskService } from './task.service';

@Module({
    providers: [TaskService], //TODO сделать провайдер для репозитория
    exports: [TaskService]
})
export class TaskModule {}
