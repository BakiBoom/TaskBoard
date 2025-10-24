import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";
import {JwtService} from "src/auth/jwt/jwt.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next();
        }
        const accessToken = authHeader.split(' ')[1];

        try {
            req.user = this.jwtService.verifyToken(accessToken);
            return next();
        } catch {
            let decodedToken = null;
            try {
                decodedToken = this.jwtService.decodeToken(accessToken);
            } catch (e) {
                return next();
            }

            if (
                !decodedToken ||
                typeof decodedToken !== 'object' ||
                !('userId' in decodedToken)
            ) {
                return next();
            }

            const userId = String(decodedToken.userId);

            const refreshToken = await this.jwtService.getToken(userId);
            if(!refreshToken) {
                return next();
            }
            try {
                this.jwtService.verifyToken(refreshToken);
            }catch {
                await this.jwtService.deleteToken(userId);
                return next();
            }

            const newTokens = this.jwtService.generateTokens({
                userId: decodedToken.userId,
                email: decodedToken.email,
                username: decodedToken.username,
            });

            await this.jwtService.setToken(userId, newTokens.refreshToken);

            req.user = {
                userId: decodedToken.userId,
                email: decodedToken.email,
                username: decodedToken.username,
            };

            res.setHeader('X-Access-Token', newTokens.accessToken);

            next();
        }

    }
}