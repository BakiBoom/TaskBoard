import * as bcrypt from 'bcrypt';

export class Crypt {
    static async encrypt(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    static async verify(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}