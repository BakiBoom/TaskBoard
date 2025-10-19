import {Body, Controller, HttpCode, HttpStatus, Post, Res} from "@nestjs/common";
import {Response} from "express";
import {AuthService} from "src/auth/auth.service";
import {ILoginDto} from "src/auth/interfaces/login.dto";
import {IRegisterDto} from "src/auth/interfaces/register.dto";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    async register(@Body() dto: IRegisterDto, @Res() response: Response) {
        const answer = await this.authService.register(dto);
        return response.json(answer);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: ILoginDto) {
        return await this.authService.login(dto);
    }
}