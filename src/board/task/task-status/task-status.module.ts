import { Module } from '@nestjs/common';

import { TaskStatusService } from './task-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TaskStatus])],
    providers: [TaskStatusService],
    exports: [TaskStatusService]
})
export class TaskStatusModule {}
