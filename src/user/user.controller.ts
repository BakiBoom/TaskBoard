import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {Response} from "express";
import {IUserProfile} from "src/user/user.models";
import {UserService} from "src/user/user.service";

@Controller('user')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Post('updateProfile')
    async update(@Body() userId: bigint, @Body() dto: IUserProfile, @Res() response: Response): Promise<Response> {
        const answer = await this._userService.update(userId, dto);
        console.log(answer);
        return response.json(answer);
    }

    @Get(':id')
    async getById(@Param('id') id: bigint, @Res() response: Response): Promise<Response> {
        const answer = await this._userService.getById(id);
        console.log(answer);
        return response.json(answer);
    }

    @Post('delete')
    async delete(@Body() userId: bigint, @Res() response: Response): Promise<Response> {
        const answer = await this._userService.delete(userId);
        console.log(answer);
        return response.json(answer);
    }
}
