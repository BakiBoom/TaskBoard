import { Module } from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {AuthController} from "src/auth/auth.controller";
import {AuthService} from "src/auth/auth.service";
import {JwtModule} from "src/auth/jwt/jwt.module";
import {JwtStrategy} from "src/auth/strategies/jwt.strategy";
import {UserModule} from "src/user/user.module";

@Module({
    imports: [
        PassportModule,
        JwtModule,
        UserModule
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [],
})
export class AuthModule {}
