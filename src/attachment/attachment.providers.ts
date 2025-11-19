import {Attachment} from "src/attachment/attachment.entity";
import {ATTACHMENT_REPOSITORY, DATA_SOURCE} from "src/common/constants";
import {DataSource} from "typeorm";

export const attachmentProviders = [{
    provide: ATTACHMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Attachment),
    inject: [DATA_SOURCE],
}];