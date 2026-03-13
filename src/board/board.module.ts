import { Module } from '@nestjs/common';
import { UserBoardsModule } from 'src/user/user-boards/user-boards.module';

import { BoardService } from './board.service';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Board]),
        TaskModule,
        UserBoardsModule
    ],
    providers: [BoardService],
    exports: [BoardService]
})
export class BoardModule {}
