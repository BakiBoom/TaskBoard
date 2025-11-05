import { DeepPartial } from "typeorm";

export interface IResult<T = any> {
    error: string | null;
    result?: T;
};

export interface IFilter<T> {
    filter: DeepPartial<T>;
};

export interface IUserForBoard {
    userId: bigint,
    roleId: bigint
};