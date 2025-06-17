
class CSVManager{

    async converTo<T> ( content:string ,conversor:(content:string)=>T): Promise<T> { 
        let x:T = conversor(content);
        return x;
    }  
}


export var csvManager = new CSVManager();