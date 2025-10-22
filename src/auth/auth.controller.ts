import {Body, Controller, Get, HttpCode, HttpStatus, Post, Res} from "@nestjs/common";
import {Response} from "express";
import {ILogin, IRegister} from "src/auth/auth.models";
import {AuthService} from "src/auth/auth.service";
import {Authorization} from "src/auth/decorators/authorization.decorator";
import {UserData} from "src/auth/decorators/authorized.decorator";
import {IUserPayload} from "src/auth/jwt/jwt.models";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    async register(@Body() dto: IRegister, @Res() response: Response) {
        const answer = await this.authService.register(dto);
        console.log(answer);
        return response.json(answer);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: ILogin) {
        return await this.authService.login(dto);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Body() id: number) {
        return await this.authService.logout(id);
    }

    @Authorization()
    @Get('test')
    @HttpCode(HttpStatus.OK)
    async me(@UserData() user: IUserPayload) {
        return user;
    }
}