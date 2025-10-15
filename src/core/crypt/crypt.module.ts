import { Module } from '@nestjs/common';
import {CryptService} from "src/core/crypt/crypt.service";

@Module({
    imports: [],
    providers: [CryptService],
    exports: [CryptService],
})
export class CryptModule {}
