import { Module } from '@nestjs/common';
import {RedisModule} from "src/redis/redis.module";
import { RedisService } from 'src/redis/redis.service';

import { JwtService } from './jwt.service';

@Module({
    imports: [RedisModule],
    providers: [JwtService],
    exports: [JwtService]
})
export class JwtModule {}
