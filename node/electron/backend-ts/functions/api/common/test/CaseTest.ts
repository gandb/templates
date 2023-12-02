import { Test } from './Test';
import { IConsole } from "./IConsole";
import { Assert } from './Assert';

   

export class Case 
{
    private _name:string;
    private _tests : Array<Test> = new Array();
    private _ident:number=0;

    constructor(name:string)
    {
        this._name = name;        
    }


    private genericOutput(output:IConsole,message?: any, ...optionalParams: any[]):void
    {
        let ident = "";

        for(let index=0 ; index < this._ident ; index ++)
        {
            ident+=">>";
        }

        if(optionalParams[0].length == 0 )
        {
            output(ident,message);
        }
        else if(optionalParams[0].length == 1 )
        {
            output(ident,message,optionalParams[0][0]);
        }
        else
        {
            output(ident,message,optionalParams[0][0],optionalParams[0][1]);
        } 
 
    }

    private log(message?: any, ...optionalParams: any[])
    {
       this.genericOutput(console.log,message,optionalParams);
    }

    private error(message?: any, ...optionalParams: any[])
    {
       this.genericOutput(console.error,message,optionalParams);
    }

    public test(name:string):Test
    {
        const test:Test = new Test(this,name);
        this._tests.push(test);
        return test;
    }

    public async start()
    {
        this.log(`Running Case Test [${this._name}]`);
        this._ident++;
        const testsLength :number =  this._tests.length;
        let testsSuccess :number =  0;
        for(let test of this._tests)
        {   
            this.log(`=====================`);         
            this.log(`Running Test [${test.name}]`);
            this._ident++;

            const assert:Assert = new Assert();

            assert.start();

            await test.requestTest(assert);

            assert.stop();

            if(!assert.result)
            {
                this.log(`Test OK `);
                testsSuccess++;
            }
            else
            {
                this.error(`Error : [${assert.result}]`);
            }
            this._ident--;            
        }
        this._ident--;
        this.log(`==========================================`);
        this.log(`===                                    ===`);
        this.log(`===  Tests with errors:${testsLength-testsSuccess}`);
        this.log(`===  Tests with success:${testsSuccess}`);
        this.log(`===  Total tests:${testsLength}`);
        this.log(`===                                    ===`);
        this.log(`==========================================`);        
    }
}
 