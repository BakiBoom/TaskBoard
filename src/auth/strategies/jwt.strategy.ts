import {PassportStrategy} from "@nestjs/passport";
import { config } from "dotenv";
import {JwtPayload} from "jsonwebtoken";
import {ExtractJwt, Strategy} from "passport-jwt";
import {AuthService} from "src/auth/auth.service";

config();
export class JwtService extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET as string,
        });
    }

    validate(payload: JwtPayload) {

    }
}