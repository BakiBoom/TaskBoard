import { Module } from '@nestjs/common';

import { TaskDeadlineService } from './task-deadline.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskDeadline } from './task-deadline.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TaskDeadline])],
    providers: [TaskDeadlineService],
    exports: [TaskDeadlineService]
})
export class TaskDeadlinesModule {}
