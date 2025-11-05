import { Module } from '@nestjs/common';
import { UserBoardsModule } from 'src/user/user-boards/user-boards.module';

import { BoardService } from './board.service';
import { TaskModule } from './task/task.module';

@Module({
    imports: [
        TaskModule,
        UserBoardsModule
    ],
    providers: [BoardService],
    exports: [BoardService]
})
export class BoardModule {}
