import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {AuthModule} from "src/auth/auth.module";

import { AppService } from "./app.service";

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}