
export class Email{
    private _email :string;
    public constructor(email:string)
    {
        if(!this.validateEmail(email))
        {
            throw new Error("Email incorreto");
        } 
        this._email = email;
    }

    private validateEmail(email:string):boolean{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public email():string{
        return this._email;
    }
}