export class Context {

    public id?: number;
    private map: Map<string, any> = new Map();

    constructor(id: number) {

        this.id = id;
    }

    public set(key: string, value: any) {        
        this.map.set(key, value);
        console.log("this",this);
    }

    public get(key: string) {
        return this.map.get(key);
    }

    public get size(): number {
        return this.map.size;
    }

    public keys(): IterableIterator<string> {
        return this.map.keys();
    }
    
    public toString():string
    {
        const ret:any = {id:this.id};
        
        let key:string = null;
        let keys = Array.from( this.map.keys() );

        for(let key of keys)
        {
            const value : any = this.get(key);
            ret[key] = value ;
        }

        return JSON.stringify(ret);

    }
}

