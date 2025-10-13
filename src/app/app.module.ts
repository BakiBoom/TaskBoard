import { Module } from "@nestjs/common";
import {AuthModule} from "src/auth/auth.module";

import { AppService } from "./app.service";

@Module({
    imports: [AuthModule],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}