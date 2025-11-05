import { IFilter, IPartner } from "src/common/intrfaces/IProcessing";

import { Board } from "./board.entity";

export interface ICreateBoardRequest extends IFilter<Board> {
    masterId: bigint;
    partners: IPartner[];
};