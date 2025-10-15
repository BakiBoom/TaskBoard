import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {Request} from "express";
import {JwtService} from "src/core/jwt/jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest() as Request;

        const token = request.headers.authorization;

        if (!token || !token.startsWith('Bearer ')) {
            console.log("No token provided");
            return false;
        }

        const payload = this.jwtService.verifyToken(token);

        return !!payload;

    }
}
