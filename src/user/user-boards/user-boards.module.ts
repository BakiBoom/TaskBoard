import { Module } from '@nestjs/common';

import { RoleModule } from '../role/role.module';

import { UserBoardsService } from './user-boards.service';

@Module({
    imports: [RoleModule],
    providers: [UserBoardsService]
})
export class UserBoardsModule {}
