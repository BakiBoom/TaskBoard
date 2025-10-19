import { registerAs } from "@nestjs/config";
import { config } from "dotenv";
config();

export default registerAs('redis', () => ({
    host: process.env.REDIS_HOST as string,
    port: parseInt(process.env.REDIS_PORT as string)
}));