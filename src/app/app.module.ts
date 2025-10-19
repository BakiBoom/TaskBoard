import { Module } from "@nestjs/common";
import {
    ConfigModule,
    ConfigService
} from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import {AuthModule} from "src/auth/auth.module";
import appConfig from "src/core/config/app.config";
import authConfig from "src/core/config/auth.config";
import databaseConfig from "src/core/config/database.config";
import redisConfig from "src/core/config/redis.config";
import { getTypeOrmConnfig } from "src/core/database.factory";

import { AppService } from "./app.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [
                appConfig,
                authConfig,
                databaseConfig,
                redisConfig
            ]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getTypeOrmConnfig
        }),
        AuthModule,
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}