  
export class Assert 
{ 
    private _result:string = null;
    public _stop:boolean = false;

    public checkIfCanAssert()
    {
        if(this._stop)
        {
            throw Error("Assert after stoped!");
        }
    }

    public start()
    {
        this._stop = false;
    }

    public stop()
    {
        this._stop = true;
    }


    public error(error1:string|Error,error2:Error|undefined=undefined):void
    {
        this.checkIfCanAssert();

        const previousError:boolean = this._result != null;
        if(previousError)
        {
            return;
        }

        if(error2)
        {
            if(error1 instanceof Error)
            {
                this._result =  "Error1 :" + ( error1 as Error).message  + " - Error2:" + ( error2 as Error).message;
            }
            else{
                this._result = (error1 as string)  + " - " + ( error2 as Error).message;
            }
            
        }
        else if (error1 instanceof Error)
        {
            this._result = (error1 as Error).message;
        }
        else{
            this._result = error1 as string;
        } 
    }
 

    public equals(title:string, expected:any, received:any):void
    {
        this.checkIfCanAssert();

        const previousError:boolean = this._result != null;
        if(previousError)
        {
            return;
        }

        if(expected != received )
        {
            this._result = `Expected [${expected}] received [${received}]`;
        }
    }

    public notEquals(title:string, notExpected:any, received:any):void
    {
        this.checkIfCanAssert();

        const previousError:boolean = this._result != null;
        if(previousError)
        {
            return;
        }

        if(notExpected == received )
        {
            this._result = `Not expected [${received}]`;
        }
    }

    public isTrue(title:string, received:boolean):void
    {
        this.equals(title,true,received);
    }

    public isFalse(title:string, received:boolean):void
    {
        this.equals(title,false,received);
    }

    public isNull(title:string, received:any):void
    {
        this.equals(title,null,received);
    }

    
    public isNotNull(title:string,  received:any):void
    {
        this.checkIfCanAssert();

        const previousError:boolean = this._result != null;
        if(previousError)
        {
            return;
        }

        if(  received == null )
        {
            this._result = `Expected [not null] received [null]`;
        }
    }

    
    public notContain(title:string,  received:string, content:string):void
    {
        this.checkIfCanAssert();

        const previousError:boolean = this._result != null;
        if(previousError)
        {
            return;
        }

        if(  received.indexOf(content) > -1 )
        {
            this._result = `Expected the value [${received}] not contain [${content}]`;
        }
    }


    
    public contain(title:string,  received:string, content:string):void
    {
        this.checkIfCanAssert();

        const previousError:boolean = this._result != null;
        if(previousError)
        {
            return;
        }

        if(  received.indexOf(content) < 0 )
        {
            this._result = `Expected the value [${received}] contain [${content}]`;
        }
    }

    public get result():string
    {
        return this._result;
    }
}
 