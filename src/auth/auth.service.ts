import {Injectable} from "@nestjs/common";
import {LoginDto} from "src/auth/interfaces/login.dto";
import {RegisterDto} from "src/auth/interfaces/register.dto";
import {CryptService} from "src/crypt/crypt.service";
import {UserPayload} from "src/jwt/interfaces/UserPayload";
import {JwtService} from "src/jwt/jwt.service";
import {UserRepository} from "src/user/user.repository";

@Injectable()
export class AuthService {

    constructor(private readonly userRepository : UserRepository,
                private readonly jwtService: JwtService,
                private readonly CryptService: CryptService) {}

    async register(registerDto: RegisterDto) {

        const {username, email, password} = registerDto;

        const existingUser = await this.userRepository.getByEmail(email);

        if (existingUser) {
            return null;
        }

        const cryptPassword: string = await this.CryptService.createHash(password);

        const userData: RegisterDto = {
            username,
            email,
            password: cryptPassword
        };

        const user = await this.userRepository.createRecord(userData);

        if (!user) {
            return null;
        }
        const userPayload : UserPayload = {
            userId: user.id,
            email: user.email,
            username: user.username,
        };

        const tokens = this.jwtService.generateTokens(userPayload);

        await this.jwtService.setToken('refresh_token', tokens.refreshToken);

        return tokens;
    }

    async login(loginDto: LoginDto) {
        const user = await this.userRepository.getByEmail(loginDto.email);
        if (!user) {
            return null;
        }

        const isValidPassword = await this.CryptService.verifyPassword(loginDto.password, user.password);

        if(!isValidPassword){
            return null;
        }

        const userPayload : UserPayload = {
            userId: user.id,
            email: user.email,
            username: user.username,
        };

        const tokens = this.jwtService.generateTokens(userPayload);

        await this.jwtService.setToken('refresh_token', tokens.refreshToken);

        return tokens;
    }
}