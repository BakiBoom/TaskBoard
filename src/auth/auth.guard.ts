import {CanActivate, ExecutionContext} from "@nestjs/common";

export class JwtGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        return request.user;
    }
}
