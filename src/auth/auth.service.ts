import {Injectable} from "@nestjs/common";
import {ILogin, IRegister} from "src/auth/auth.models";
import {IUserPayload} from "src/auth/jwt/jwt.models";
import {JwtService} from "src/auth/jwt/jwt.service";
import { Crypt } from "src/common/utils/crypt";
import {UserRepository} from "src/user/user.repository";
import {UserService} from "src/user/user.service";

@Injectable()
export class AuthService {

    constructor(
        private readonly _userRepository : UserRepository,
        private readonly _jwtService: JwtService,
        private readonly _userService: UserService
    ) {}

    async register(registerDto: IRegister) {

        const {username, email, password} = registerDto;
        const existingUser = await this._userRepository.getByEmail(email);
        if (existingUser) {
            console.log('A user with this email is already registered.',existingUser);
            return null;
        }

        const cryptPassword: string = await Crypt.encrypt(password);
        const userData: IRegister = {
            username,
            email,
            password: cryptPassword
        };

        const user = await this._userService.create(userData);
        if (!user) {
            console.log("Could not create user", user);
            return null;
        }

        const tokens = this._jwtService.generateTokens({
            userId: user.id,
            email: user.email,
            username: user.username,
        });
        await this._jwtService.setToken(user.id.toString(), tokens.refreshToken);

        return tokens.accessToken;
    }

    async login(loginDto: ILogin) {
        const user = await this._userRepository.getByEmail(loginDto.email);
        if (!user) {
            return null;
        }
        const isValid = await Crypt.verify(loginDto.password, user.password);
        if(!isValid){
            return null;
        }
        const tokens = this._jwtService.generateTokens({
            userId: user.id,
            email: user.email,
            username: user.username,
        });
        await this._jwtService.setToken(user.id.toString(), tokens.refreshToken);

        return tokens.accessToken;
    }

    async logout(id: number) {
        await this._jwtService.deleteToken(id.toString());
        return true;
    }

    async validate(payload: IUserPayload): Promise<IUserPayload | null> {
        const user = await this._userRepository.getById(payload.userId);
        if (!user) {
            console.log("Could not find user", payload.userId);
            return null;
        }
        return {
            userId: user.id,
            username: user.username,
            email: user.email,
        };
    }
}