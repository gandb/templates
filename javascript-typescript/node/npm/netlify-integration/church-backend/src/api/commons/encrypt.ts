 
import * as crypto  from 'crypto';
 
class PasswordCrypt{ 
    private SALT:string = "C@NT@5";

    constructor(){
        if(process.env.CONTAS_PASSWORD_SALT)
        {
            this.SALT = process.env.CONTAS_PASSWORD_SALT;
        }
    }
 
    public crypt(value:string,version?:string):string { 
        const hash1 = crypto.createHash('sha256');
        const VERSION:string = "001";
        if(!version || version=="001")
        {
            hash1.update( value+ "-" + this.SALT);
            return VERSION + "-" + hash1.digest('hex');     
        }
        throw new Error("Versão desconhecida");
    }
}

export var passwordCrypt = new PasswordCrypt();