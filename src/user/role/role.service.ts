import {
    Injectable,
    NotFoundException
} from "@nestjs/common";
import { Repository } from "typeorm";

import { Role } from "./role.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RoleService {
    constructor (
        @InjectRepository(Role)
        private readonly _roleRepository: Repository<Role>
    ) {}

    public async getAll(): Promise<Role[]> {
        const roles: Role[] = await this._roleRepository.find();
        if (roles.length <= 0) {
            throw new NotFoundException('Roles not found');
        }
        return roles;
    }

    public async getById(id: number): Promise<Role> {
        const role: Role | null = await this._roleRepository.findOne({
            where: {
                id: id
            }
        });
        if (!role) {
            throw new NotFoundException(`Could not find role with id: ${id}.`);
        }
        return role;
    }
}