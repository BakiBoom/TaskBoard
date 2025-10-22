import {applyDecorators, UseGuards} from "@nestjs/common";
import {JwtGuard} from "src/auth/auth.guard";

export function Authorization() {
    return applyDecorators(UseGuards(JwtGuard));
}