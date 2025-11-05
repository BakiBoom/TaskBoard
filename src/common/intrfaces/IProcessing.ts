import { DeepPartial } from "typeorm";

export interface IFilter<I> {
    filter: DeepPartial<I>;
};

export interface IPartner {
    userId: bigint,
    roleId: bigint
};