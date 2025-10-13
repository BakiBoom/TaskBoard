import { Injectable } from "@nestjs/common";
import { config } from "dotenv";
import { Redis } from "ioredis";
config();

@Injectable()
export class RedisService {
    private redis = new Redis(
        {
            port: Number(process.env.REDIS_PORT),
            host: process.env.REDIS_HOST as string,
            password: process.env.REDIS_PASSWORD as string,
            db: 0
        }
    );

    public async get(key: string): Promise<string | null> {
        if(this.redis.on("connect", () => true)){
            return await this.redis.get(key);
        }
        else{
            return null;
        }
    }

    public async set(key: string, value: string): Promise<string | null> {
        if(this.redis.on("connect", () => true)){
            return await this.redis.set(key, value);
        }
        else{
            return null;
        }
    }

    public async delete(key: string): Promise<number | null> {
        if(this.redis.on("connect", () => true)){
            return await this.redis.del(key);
        }
        else{
            return null;
        }
    }
}