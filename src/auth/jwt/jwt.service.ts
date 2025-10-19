import {
    Inject,
    Injectable
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import jwt from "jsonwebtoken";
import authConfig from "src/core/config/auth.config";
import { RedisService } from "src/redis/redis.service";

import { UserPayload } from "./interfaces/UserPayload";

@Injectable()
export class JwtService {
    constructor(
        @Inject(authConfig.KEY)
        private authConfiguration: ConfigType<typeof authConfig> ,
        private redisService: RedisService
    ) {}

    public generateTokens(userPayload: UserPayload) {
        const accessToken = jwt.sign(userPayload, this.authConfiguration.secretKey, {expiresIn: this.authConfiguration.accessExpiresIn} as jwt.SignOptions);
        const refreshToken = jwt.sign(userPayload, this.authConfiguration.secretKey, {expiresIn: this.authConfiguration.refershExpiresIn} as jwt.SignOptions);
        return {accessToken, refreshToken};
    }

    public verifyToken(token: string) {
        return jwt.decode(token) as UserPayload;
    }

    public async setToken(key: string, token: string): Promise<string | null> {
        return await this.redisService.set(key, token);
    }

    public async getToken(key: string): Promise<string | null> {
        return await this.redisService.get(key);
    }

    public async deleteToken(key: string): Promise<number | null> {
        return await this.redisService.delete(key);
    }
}