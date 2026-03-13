import { Module } from '@nestjs/common';

import { RoleModule } from '../role/role.module';

import { UserBoardsService } from './user-boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBoards } from './user-boards.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserBoards]),
        RoleModule
    ],
    providers: [UserBoardsService],
    exports: [UserBoardsService, TypeOrmModule]
})
export class UserBoardsModule {}
