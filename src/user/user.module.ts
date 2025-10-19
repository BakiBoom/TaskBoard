import { Module } from '@nestjs/common';
import { UserRepository } from "src/user/user.repository";

import { RoleModule } from './role/role.module';
import { UserBoardsModule } from './user-boards/user-boards.module';

@Module({
    imports: [
        RoleModule,
        UserBoardsModule
    ],
    providers: [UserRepository],
    exports: [UserRepository],
})
export class UserModule {}
