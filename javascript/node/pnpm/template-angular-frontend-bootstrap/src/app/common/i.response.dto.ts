export interface IResponseDTO<T>
{
    code:number;
    data:T;
    error:string;
}