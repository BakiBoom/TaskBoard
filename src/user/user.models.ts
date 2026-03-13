import { Attachment } from "src/attachment/attachment.entity";
import { Board } from "src/board/board.entity";

export interface IUserProfile {
    id: bigint;
    username: string;
    email: string;
    avatars: Attachment[];
    boards: Board[];
};

export interface IUpdateUserProfile {
    id: bigint;
    username: string;
}