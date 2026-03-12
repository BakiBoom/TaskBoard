import {Attachment} from "src/attachment/attachment.entity";
import {UserBoards} from "src/user/user-boards/user-boards.entity";

export interface IUserProfile {
    id: bigint;
    username: string;
    email?: string;
    avatars?: Attachment[];
    createDate: string;
    boards: UserBoards[] | null;
}