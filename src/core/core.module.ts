import { Module } from '@nestjs/common';
import {CryptService} from "src/core/crypt/crypt.service";
import {JwtService} from "src/core/jwt/jwt.service";
import {RedisModule} from "src/redis/redis.module";
import {RedisService} from "src/redis/redis.service";

@Module({
    imports: [RedisModule],
    providers: [CryptService, JwtService, RedisService],
    exports: [CryptService, JwtService, RedisService],
})
export class CoreModule {}
