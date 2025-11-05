import { Module } from '@nestjs/common';

import { TaskStatusService } from './task-status.service';

@Module({
    providers: [TaskStatusService], //TODO сделать провайдер для репозитория
    exports: [TaskStatusService]
})
export class TaskStatusModule {}
