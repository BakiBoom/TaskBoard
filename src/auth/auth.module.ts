import { Module } from '@nestjs/common';
import {AuthController} from "src/auth/auth.controller";
import {AuthService} from "src/auth/auth.service";
import {CoreModule} from "src/core/core.module";
import {JwtModule} from "src/core/jwt/jwt.module";
import {UserModule} from "src/user/user.module";

@Module({
    imports: [JwtModule, UserModule, CoreModule],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [],
})
export class AuthModule {}
