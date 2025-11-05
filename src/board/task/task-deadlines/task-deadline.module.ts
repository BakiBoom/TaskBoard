import { Module } from '@nestjs/common';

import { TaskDeadlineService } from './task-deadline.service';

@Module({
    providers: [TaskDeadlineService], //TODO сделать провайдер для репозитория
    exports: [TaskDeadlineService]
})
export class TaskDeadlinesModule {}
