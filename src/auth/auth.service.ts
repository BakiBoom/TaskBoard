import {
    Injectable,
    ConflictException,
    BadRequestException
} from "@nestjs/common";
import {
    ILogin,
    IRegister
} from "src/auth/auth.models";
import { IUserPayload } from "src/auth/jwt/jwt.models";
import { JwtService } from "src/auth/jwt/jwt.service";
import { Crypt } from "src/common/utils/crypt";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {

    constructor(
        private readonly _userService: UserService,
        private readonly _jwtService: JwtService,
    ) {}

    async register(registerDto: IRegister): Promise<string> {
        const existingUser: User = await this._userService.getByEmail(registerDto.email);
        if (existingUser) {
            throw new ConflictException(`User with email "${registerDto.email}" already exists.`);
        }

        const cryptPassword: string = await Crypt.encrypt(registerDto.password);
        registerDto.password = cryptPassword;

        const user: User = await this._userService.create(registerDto);
        const tokens = this._jwtService.generateTokens({
            userId: user.id,
            email: user.email,
            username: user.username,
        });

        await this._jwtService.setToken(user.id.toString(), tokens.refreshToken);
        return tokens.accessToken;
    }

    async login(loginDto: ILogin): Promise<string> {
        const user: User = await this._userService.getByEmail(loginDto.email);
        const isValid = await Crypt.verify(loginDto.password, user.password);
        if(!isValid){
            throw new BadRequestException('Incorrect password');
        }

        const tokens = this._jwtService.generateTokens({
            userId: user.id,
            email: user.email,
            username: user.username,
        });
        await this._jwtService.setToken(user.id.toString(), tokens.refreshToken);
        await this._jwtService.setToken(user.id.toString(), tokens.refreshToken);

        return tokens.accessToken;
    }

    async logout(id: number): Promise<boolean> {
        await this._jwtService.deleteToken(id.toString());
        return true;
    }

    async validate(payload: IUserPayload): Promise<IUserPayload> {
        const user: User = await this._userService.getById(payload.userId);
        return {
            userId: user.id,
            username: user.username,
            email: user.email,
        };
    }
}