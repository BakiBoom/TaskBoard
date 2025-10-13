import { Module } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

import { JwtService } from './jwt.service';

@Module({
    imports: [RedisService],
    providers: [JwtService],
    exports: [JwtService]
})
export class JwtModule {}
