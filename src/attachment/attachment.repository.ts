import {
    DeepPartial,
    Repository,
    UpdateResult
} from "typeorm";
import { Attachment } from "./attachment.entity";

export class AttachmentRepository extends Repository<Attachment> {
    public async createRecord(filter: DeepPartial<Attachment>): Promise<Attachment | null> {
        try {
            return await this.save(this.create(filter));
        } catch (error: any) {
            return null;
        }
    }

    public async updateRecord(entity: Attachment, filter: DeepPartial<Attachment>): Promise<UpdateResult | null> {
        try {
            return await this.update({id: entity.id}, filter);
        } catch (error: any) {
            return null;
        }
    }

    public async getById(value: bigint): Promise<Attachment | null> {
        try {
            return await this.findOne({
                where: {
                    id: value
                }
            });
        } catch (error: any) {
            return null;
        }
    }

    public async getByToken(value: string): Promise<Attachment | null> {
        try {
            return await this.findOne({
                where: {
                    token: value
                }
            });
        } catch (error: any) {
            return null;
        }
    }
}