import {Injectable} from "@nestjs/common";
import {ILogin, IRegister} from "src/auth/auth.models";
import {IUserPayload} from "src/auth/jwt/jwt.models";
import {JwtService} from "src/auth/jwt/jwt.service";
import { Crypt } from "src/common/utils/crypt";
import {UserRepository} from "src/user/user.repository";

@Injectable()
export class AuthService {

    constructor(
        private readonly userRepository : UserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async register(registerDto: IRegister) {

        const {username, email, password} = registerDto;
        const existingUser = await this.userRepository.getByEmail(email);
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

        const user = await this.userRepository.createRecord(userData);
        if (!user) {
            console.log("Could not create user", user);
            return null;
        }

        const tokens = this.jwtService.generateTokens({
            userId: user.id,
            email: user.email,
            username: user.username,
        });
        await this.jwtService.setToken(user.id.toString(), tokens.refreshToken);

        return tokens.accessToken;
    }

    async login(loginDto: ILogin) {
        const user = await this.userRepository.getByEmail(loginDto.email);
        if (!user) {
            return null;
        }
        const isValid = await Crypt.verify(loginDto.password, user.password);
        if(!isValid){
            return null;
        }
        const tokens = this.jwtService.generateTokens({
            userId: user.id,
            email: user.email,
            username: user.username,
        });
        await this.jwtService.setToken(user.id.toString(), tokens.refreshToken);

        return tokens.accessToken;
    }

    async logout(id: number) {
        await this.jwtService.deleteToken(String(id));
        return true;
    }

    async validate(payload: IUserPayload): Promise<IUserPayload | null> {
        const user = await this.userRepository.getById(payload.userId);
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