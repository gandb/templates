
export class Description{
    private _description :string;
    public constructor(description:string)
    {
        if(description==null)
        {
            this._description = "";
        }
        else{
            this._description = description;
        }
    }

    public description(){
        return this._description;
    }
}

