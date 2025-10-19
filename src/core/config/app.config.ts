import { registerAs } from "@nestjs/config";
import { config } from "dotenv";
config();

export default registerAs('app', () => ({
    port: parseInt(process.env.APP_PORT as string),
    environment: process.env.APP_ENVIRONMENT as string
}));