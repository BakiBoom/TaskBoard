import { Module } from '@nestjs/common';

import { RoleService } from './role.service';

@Module({
    providers: [RoleService], //TODO сделать провайдер для репозитория
    exports: [RoleService]
})
export class RoleModule {}
