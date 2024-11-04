import { Case } from './CaseTest';
import { IRequestTest } from "./IRequestTest";

   
export class Test 
{
    private _name:string;
    private _case:Case;
    private _requestTest:IRequestTest;

    constructor(case1:Case,name:string)
    {
        this._name = name;  
        this._case = case1;      
    }

    public get name():string
    {
        return this._name;
    }

    public get requestTest():IRequestTest
    {
        return this._requestTest;
    }

    public using(requestTest:IRequestTest) : Case
    {
        this._requestTest = requestTest; 
        return this._case;
    }
}
 