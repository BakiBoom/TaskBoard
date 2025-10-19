import { registerAs } from "@nestjs/config";
import { config } from "dotenv";
config();

export default registerAs('database', () => ({
    host: process.env.DATABASE_HOST as string,
    port: parseInt(process.env.DATABASE_PORT as string),
    name: process.env.DATABASE_NAME as string,
    user: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASWORD as string
}));