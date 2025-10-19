import { registerAs } from "@nestjs/config";
import { config } from "dotenv";
config();

export default registerAs('auth', () => ({
    secretKey: process.env.JWT_SECRET_KEY as string,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN as string,
    refershExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN as string
}));