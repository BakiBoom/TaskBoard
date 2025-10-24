import { Module } from '@nestjs/common';
import {AuthController} from "src/auth/auth.controller";
import {AuthService} from "src/auth/auth.service";
import {JwtModule} from "src/auth/jwt/jwt.module";
import {UserModule} from "src/user/user.module";

@Module({
    imports: [
        JwtModule,
        UserModule
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [],
})
export class AuthModule {}
