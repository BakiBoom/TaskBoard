import {
    Inject,
    Injectable
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import * as jwt from "jsonwebtoken";
import { IUserPayload } from "src/auth/jwt/jwt.models";
import authConfig from "src/core/config/auth.config";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class JwtService {
    constructor(
        @Inject(authConfig.KEY)
        private _authConfiguration: ConfigType<typeof authConfig> ,
        private _redisService: RedisService
    ) {}

    public generateTokens(userPayload: IUserPayload) {
        const accessToken = jwt.sign(userPayload, this._authConfiguration.secretKey, {expiresIn: this._authConfiguration.accessExpiresIn} as jwt.SignOptions);
        const refreshToken = jwt.sign(userPayload, this._authConfiguration.secretKey, {expiresIn: this._authConfiguration.refershExpiresIn} as jwt.SignOptions);
        return {accessToken, refreshToken};
    }

    public decodeToken(token: string): IUserPayload {
        return jwt.decode(token) as IUserPayload;
    }

    public verifyToken(token: string): IUserPayload {
        try{
            return jwt.verify(token, this._authConfiguration.secretKey, {ignoreExpiration: false}) as IUserPayload;
        } catch (error: any) {
            return error;
        }
    }

    public async setToken(key: string, token: string): Promise<string | null> {
        return await this._redisService.set(key, token);
    }

    public async getToken(key: string): Promise<string | null> {
        return await this._redisService.get(key);
    }

    public async deleteToken(key: string): Promise<number | null> {
        return await this._redisService.delete(key);
    }
}