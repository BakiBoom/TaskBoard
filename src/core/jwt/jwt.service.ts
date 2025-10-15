import { Injectable } from "@nestjs/common";
import jwt from "jsonwebtoken";
import { RedisService } from "src/redis/redis.service";

import { UserPayload } from "./interfaces/UserPayload";

@Injectable()
export class JwtService {
    constructor(private RedisService: RedisService) {}

    public generateTokens(userPayload: UserPayload) {
        const accessToken = jwt.sign(userPayload, process.env.JWT_SERCRET as string, {expiresIn: '1h'});
        const refreshToken = jwt.sign(userPayload, process.env.JWT_SECRET as string, {expiresIn: '10 d'});
        return {accessToken, refreshToken};
    }

    public verifyToken(token: string) {
        return jwt.decode(token) as UserPayload;
    }

    public async setToken(key: string, token: string): Promise<string | null> {
        return await this.RedisService.set(key, token);
    }

    public async getToken(key: string): Promise<string | null> {
        return await this.RedisService.get(key);
    }

    public async deleteToken(key: string): Promise<number | null> {
        return await this.RedisService.delete(key);
    }
}