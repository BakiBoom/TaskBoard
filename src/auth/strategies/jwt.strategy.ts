import {Inject, Injectable} from "@nestjs/common";
import {ConfigType} from "@nestjs/config";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {AuthService} from "src/auth/auth.service";
import {IUserPayload} from "src/auth/jwt/jwt.models";
import authConfig from "src/core/config/auth.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService: AuthService,
        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConfiguration.secretKey,
        });
    }

    async validate(payload: IUserPayload) {
        return await this.authService.validate(payload);
    }
}