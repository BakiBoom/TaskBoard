import {
    Inject,
    Injectable,
    OnModuleInit,
    OnModuleDestroy,
    InternalServerErrorException
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { Redis } from "ioredis";
import redisConfig from "src/core/config/redis.config";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private _client: Redis;

    constructor (
        @Inject(redisConfig.KEY)
        private _redisConfiguration: ConfigType<typeof redisConfig>
    ) {}

    public async onModuleInit() {
        await this.connect();
    }

    public async onModuleDestroy() {
        await this.disconnect();
    }

    private async connect() {
        if (this._client && this._client.status === 'ready') {
            return;
        }
        if (this._client && this._client.status !== 'ready') {
            await this._client.connect();
        }
        if (!this._client) {
            this._client = new Redis({
                port: this._redisConfiguration.port,
                host: this._redisConfiguration.host
            });
        }

        this._client.on('connect', () => console.log('Redis connected.'));
        this._client.on('ready', () => console.log('Redis ready.'));
        this._client.on('error', (err) => console.error('Redis error: ', err));
        this._client.on('close', () => console.warn('Redis connection closed.'));
    }

    private async disconnect() {
        if (this._client) {
            await this._client.quit();
        }
    }

    private async ensureConnection() {
        if (!this._client || this._client.status !== 'ready') {
            await this.connect();
        }
    }

    public async get(key: string): Promise<string | null> {
        await this.ensureConnection();
        try {
            return await this._client.get(key);
        } catch (error: any) {
            console.error(error);
            throw new InternalServerErrorException(`Failed to GET key "${key}".`);
        }
    }

    public async set(key: string, value: string, expireSeconds?: number): Promise<string> {
        await this.ensureConnection();
        try {
            if (expireSeconds) {
                return await this._client.set(key, value, "EX", expireSeconds);
            }
            return await this._client.set(key, value);
        } catch (error: any) {
            console.error(error);
            throw new InternalServerErrorException(`Failed to GET key "${key}".`);
        }
    }

    public async delete(key: string): Promise<number> {
        await this.ensureConnection();
        try {
            return await this._client.del(key);
        } catch (error: any) {
            console.error(error);
            throw new InternalServerErrorException(`Failed to GET key "${key}".`);
        }
    }
}