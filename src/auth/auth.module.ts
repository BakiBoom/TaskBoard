import { Module } from '@nestjs/common';
import {AuthController} from "src/auth/auth.controller";
import {AuthService} from "src/auth/auth.service";
import {CryptModule} from "src/crypt/crypt.module";
import {JwtModule} from "src/jwt/jwt.module";
import {UserModule} from "src/user/user.module";

@Module({
    imports: [JwtModule, UserModule, CryptModule],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [],
})
export class AuthModule {}
