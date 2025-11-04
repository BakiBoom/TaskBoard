export interface IGeneralResponse<T> {
    data: T;
    errors: string[];
}