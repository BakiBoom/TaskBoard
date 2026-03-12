import {
    Injectable,
    NestMiddleware,
    UnauthorizedException
} from "@nestjs/common";
import {
    NextFunction,
    Request,
    Response
} from "express";
import { JwtService } from "src/auth/jwt/jwt.service";
import { ACCESS_TOKENS } from "src/common/constants";

import { ITokens, IUserPayload } from "../jwt/jwt.models";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly _jwtService: JwtService
    ) {}

    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Authorization token missing or invalid');
        }

        const accessToken = authHeader.split(' ')[1];
        let decodeToken: IUserPayload | null = null;
        try {
            decodeToken = this._jwtService.verifyToken(accessToken);
            req.user = decodeToken;
            return next();
        } catch {
            decodeToken = this._jwtService.decodeToken(accessToken);
            if (!decodeToken || !decodeToken.userId) {
                throw new UnauthorizedException('Authorization token not decode.');
            }
        }

        const userId = decodeToken.userId.toString();
        const refreshToken: string | null = await this._jwtService.getToken(userId);
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token not found. Please login again.');
        }
        try {
            this._jwtService.verifyToken(refreshToken);
        } catch {
            await this._jwtService.deleteToken(userId);
            throw new UnauthorizedException('Refresh token expired. Please login again.');
        }

        const newTokens: ITokens = this._jwtService.generateTokens({
            userId: decodeToken.userId,
            email: decodeToken.email,
            username: decodeToken.username,
        });
        await this._jwtService.setToken(userId, newTokens.refreshToken);

        req.user = {
            userId: decodeToken.userId,
            email: decodeToken.email,
            username: decodeToken.username,
        };
        res.setHeader(ACCESS_TOKENS, newTokens.accessToken);

        next();
    }
}