import {
    Inject,
    Injectable
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import * as jwt from "jsonwebtoken";
import {
    ITokens,
    IUserPayload
} from "src/auth/jwt/jwt.models";
import authConfig from "src/core/config/auth.config";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class JwtService {
    constructor(
        @Inject(authConfig.KEY)
        private _authConfiguration: ConfigType<typeof authConfig> ,
        private _redisService: RedisService
    ) {}

    public generateTokens(userPayload: IUserPayload): ITokens {
        const accessToken = jwt.sign(
            userPayload,
            this._authConfiguration.secretKey,
            { expiresIn: this._authConfiguration.accessExpiresIn } as jwt.SignOptions
        );
        const refreshToken = jwt.sign(
            userPayload,
            this._authConfiguration.secretKey,
            { expiresIn: this._authConfiguration.refershExpiresIn } as jwt.SignOptions
        );
        return {
            accessToken,
            refreshToken
        };
    }

    public decodeToken(token: string): IUserPayload | null {
        return jwt.decode(token) as IUserPayload | null;
    }

    public verifyToken(token: string): IUserPayload {
        return jwt.verify(
            token,
            this._authConfiguration.secretKey,
            { ignoreExpiration: false }
        ) as IUserPayload;
    }

    public async setToken(key: string, token: string): Promise<string> {
        return await this._redisService.set(key, token);
    }

    public async getToken(key: string): Promise<string | null> {
        return await this._redisService.get(key);
    }

    public async deleteToken(key: string): Promise<number> {
        return await this._redisService.delete(key);
    }
}