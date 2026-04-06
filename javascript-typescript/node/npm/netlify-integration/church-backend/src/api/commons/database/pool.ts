export interface Pool {
    execute(sql: string, args: any[]): Promise<void> ;
    query<T>(sql: string, args?: any[], handler?: Handler<T>): Promise<T>;
    _end(): Promise<void>;
}

export interface Handler<T> {
     convert (ret: Array<any>|any): Promise<T>;
}
