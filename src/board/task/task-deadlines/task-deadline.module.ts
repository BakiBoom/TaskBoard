import { Module } from '@nestjs/common';

import { TaskDeadlineService } from './task-deadline.service';

@Module({
    providers: [TaskDeadlineService],
    exports: [TaskDeadlineService]
})
export class TaskDeadlinesModule {}
