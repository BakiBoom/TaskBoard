import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import { config } from "dotenv";
import {ExtractJwt, Strategy} from "passport-jwt";
import {AuthService} from "src/auth/auth.service";
import {IUserPayload} from "src/auth/jwt/jwt.models";

config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY as string,
        });
    }

    async validate(payload: IUserPayload) {
        return await this.authService.validate(payload);
    }
}