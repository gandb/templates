import { IBaseDTO } from "./baseDTO";

export interface ICollection<T> extends IBaseDTO {
    contents: Array<T>;
}
