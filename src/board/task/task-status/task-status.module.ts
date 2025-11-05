import { Module } from '@nestjs/common';

import { TaskStatusService } from './task-status.service';

@Module({
    providers: [TaskStatusService],
    exports: [TaskStatusService]
})
export class TaskStatusModule {}
