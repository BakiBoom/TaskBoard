
import { Injectable } from "@nestjs/common";
import { IResult } from "src/common/intrfaces/IProcessing";
import { Repository } from "typeorm";

import { Role } from "./role.entity";

@Injectable()
export class RoleService {
    constructor (
        private readonly _roleRepository: Repository<Role>
    ) {}

    public async getAll(): Promise<IResult<Role[]>> {
        try {
            const roles: Role[] = await this._roleRepository.find();
            return {
                result: roles,
                error: null
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }

    public async getById(id: bigint): Promise<IResult<Role>> {
        try {
            const role: Role | null = await this._roleRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!role) {
                return {
                    error: `Could not find role with id: ${id}`
                };
            }
            return {
                result: role,
                error: null
            };
        } catch (error: any) {
            return {
                error: error.message
            };
        }
    }
}