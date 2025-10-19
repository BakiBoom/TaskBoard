import {
    Inject,
    Injectable
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { Redis } from "ioredis";
import redisConfig from "src/core/config/redis.config";

@Injectable()
export class RedisService {
    constructor (
        @Inject(redisConfig.KEY)
        private redisConfiguration: ConfigType<typeof redisConfig>
    ) {}

    private client = new Redis(
        {
            port: this.redisConfiguration.port,
            host: this.redisConfiguration.host
        }
    );

    public async get(key: string): Promise<string | null> {
        if(this.client.on("connect", () => true)){
            return await this.client.get(key);
        }
        else{
            return null;
        }
    }

    public async set(key: string, value: string): Promise<string | null> {
        if(this.client.on("connect", () => true)){
            return await this.client.set(key, value);
        }
        else{
            return null;
        }
    }

    public async delete(key: string): Promise<number | null> {
        if(this.client.on("connect", () => true)){
            return await this.client.del(key);
        }
        else{
            return null;
        }
    }
}