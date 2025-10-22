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
        private authConfiguration: ConfigType<typeof authConfig> ,
        private redisService: RedisService
    ) {}

    public generateTokens(userPayload: IUserPayload) {
        const accessToken = jwt.sign(userPayload, this.authConfiguration.secretKey, {expiresIn: this.authConfiguration.accessExpiresIn} as jwt.SignOptions);
        const refreshToken = jwt.sign(userPayload, this.authConfiguration.secretKey, {expiresIn: this.authConfiguration.refershExpiresIn} as jwt.SignOptions);
        return {accessToken, refreshToken};
    }

    public verifyToken(token: string) {
        return jwt.decode(token) as IUserPayload;
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