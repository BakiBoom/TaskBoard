import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Res
} from '@nestjs/common';
import { Response } from "express";
import { IUpdateUserProfile } from "src/user/user.models";
import { UserService } from "src/user/user.service";

@Controller('user')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Post('update')
    async update(@Body() data: IUpdateUserProfile, @Res() res: Response): Promise<Response> {
        const answer = await this._userService.update(data.id, data.username);
        console.log(answer);
        return res.json(answer);
    }

    @Get(':id')
    async getById(@Param('id') id: bigint, @Res() res: Response): Promise<Response> {
        const answer = await this._userService.getById(id, true);
        return res.json(answer);
    }

    @Post('remove')
    async remove(@Body() userId: bigint, @Res() res: Response): Promise<Response> {
        const answer = await this._userService.remove(userId);
        return res.json(answer);
    }
}
