import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {Request} from "express";
import {IUserPayload} from "src/auth/jwt/jwt.models";

export const UserData = createParamDecorator(
    (data: keyof IUserPayload | undefined, ctx: ExecutionContext)=> {
        const request = ctx.switchToHttp().getRequest<Request>();

        const user = request.user as IUserPayload;
        if (!user) {
            return null;
        }
        return data ? user[data] : user;
    }
);