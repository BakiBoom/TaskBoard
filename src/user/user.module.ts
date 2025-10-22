import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "src/user/user.entity";
import { UserRepository } from "src/user/user.repository";

import { RoleModule } from './role/role.module';
import { UserBoardsModule } from './user-boards/user-boards.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        RoleModule,
        UserBoardsModule
    ],
    providers: [UserRepository],
    exports: [UserRepository],
})
export class UserModule {}
