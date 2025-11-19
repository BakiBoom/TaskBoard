import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";
import {JwtService} from "src/auth/jwt/jwt.service";
import {ACCESS_TOKENS} from "src/common/constants";
import { IResult } from "src/common/intrfaces/IProcessing";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly _jwtService: JwtService) {}

    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next();
        }
        const accessToken = authHeader.split(' ')[1];

        try {
            req.user = this._jwtService.verifyToken(accessToken);
            return next();
        } catch {
            let decodedToken = null;
            try {
                decodedToken = this._jwtService.decodeToken(accessToken);
            } catch (error : any) {
                const answer : IResult<typeof error> = {error: error.message};
                res.status(401).send(answer);
                console.log("Error verifying token", error); //для уверенности
                return;
            }

            if (
                !decodedToken ||
                typeof decodedToken !== 'object' ||
                !('userId' in decodedToken)
            ) {
                return next();
            }

            const userId = String(decodedToken.userId);

            const refreshToken = await this._jwtService.getToken(userId);
            if(!refreshToken) {
                return next();
            }
            try {
                this._jwtService.verifyToken(refreshToken);
            }catch {
                await this._jwtService.deleteToken(userId);
                return next();
            }

            const newTokens = this._jwtService.generateTokens({
                userId: decodedToken.userId,
                email: decodedToken.email,
                username: decodedToken.username,
            });

            await this._jwtService.setToken(userId, newTokens.refreshToken);

            req.user = {
                userId: decodedToken.userId,
                email: decodedToken.email,
                username: decodedToken.username,
            };

            res.setHeader(ACCESS_TOKENS, newTokens.accessToken);

            next();
        }

    }
}