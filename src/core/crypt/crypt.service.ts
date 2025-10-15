import {Injectable} from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptService {
    public async createHash(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    public async verifyPassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}