import {Injectable} from "@nestjs/common";
import {ILoginDto} from "src/auth/interfaces/login.dto";
import {IRegisterDto} from "src/auth/interfaces/register.dto";
import {CryptService} from "src/core/crypt/crypt.service";
import {JwtService} from "src/core/jwt/jwt.service";
import {UserRepository} from "src/user/user.repository";

@Injectable()
export class AuthService {

    constructor(private readonly userRepository : UserRepository,
                private readonly jwtService: JwtService,
                private readonly CryptService: CryptService) {}

    async register(registerDto: IRegisterDto) {

        const {username, email, password} = registerDto;

        const existingUser = await this.userRepository.getByEmail(email);

        if (existingUser) {
            return null;
        }

        const cryptPassword: string = await this.CryptService.createHash(password);

        const userData: IRegisterDto = {
            username,
            email,
            password: cryptPassword
        };

        const user = await this.userRepository.createRecord(userData);

        if (!user) {
            return null;
        }

        const tokens = this.jwtService.generateTokens({
            userId: user.id,
            email: user.email,
            username: user.username,
        });

        await this.jwtService.setToken('refresh_token', tokens.refreshToken);

        return tokens;
    }

    async login(loginDto: ILoginDto) {
        const user = await this.userRepository.getByEmail(loginDto.email);
        if (!user) {
            return null;
        }

        const isValid = await this.CryptService.verifyPassword(loginDto.password, user.password);

        if(!isValid){
            return null;
        }

        const tokens = this.jwtService.generateTokens({
            userId: user.id,
            email: user.email,
            username: user.username,
        });

        await this.jwtService.setToken('refresh_token', tokens.refreshToken);

        return tokens;
    }

    async logout(id: number) {
        return await this.jwtService.deleteToken(String(id));
    }
}