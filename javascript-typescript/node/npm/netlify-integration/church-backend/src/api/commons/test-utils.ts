export function testException (func:()=>any):Error|boolean{
    try{
        func();
        return false;
    }
    catch(e:any)
    {
        return e as Error;
    }
}