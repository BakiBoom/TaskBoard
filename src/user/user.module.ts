import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardModule } from 'src/board/board.module';
import { User } from "src/user/user.entity";

import { RoleModule } from './role/role.module';
import { UserBoardsModule } from './user-boards/user-boards.module';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        RoleModule,
        UserBoardsModule,
        BoardModule
    ],
    providers: [UserService],
    exports: [],
})
export class UserModule {}
