
export class Name{
    private _name :string;
    public constructor(name:string)
    {
        console.log("name=" + name);
        if(!name)
        {
            throw new Error("Nome não pode ser vazio e precisa ser acima de 4 letras");
        } 
        this._name = name;
    }

    public name():string{
        return this._name;
    }
}

