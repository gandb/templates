
export class Hostname{
    private charsAcceptted:string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.";
    private _hostname :string;
    public constructor(hostname:string)
    {

        
        if(hostname && !this.validarDominio(hostname)  )
        {
            throw new Error("Incorrect hostname");
        }
        if(hostname==null)
        {
            this._hostname = "";
        }
        else{
            this._hostname = hostname;
        }
        
    }


    public validarDominio(domain: string): boolean {
 


        for(let i=0;i<domain.length;i++)
        {
//            console.log(`Char ${i}:`,domain.charAt(i),"this.charsAcceptted.indexOf(domain.charAt(i)",this.charsAcceptted.indexOf(domain.charAt(i)));
            if(this.charsAcceptted.indexOf(domain.charAt(i))<0)
            {
                return false;
            }
        }
        return true;
    }


    public hostname(){
        return this._hostname;
    }
}

