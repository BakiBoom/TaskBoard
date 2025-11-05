import { DeepPartial } from "typeorm";

export interface IFilter<I> {
    filter: DeepPartial<I>;
}