
import { Context } from "./http-server";
//import { SigninDAO } from "../signin/signinDAO";
import { IFactoryDAO } from "./IFactoryDAO";
import { BaseDAO } from "."; 

export class FactoryDAO implements IFactoryDAO {

    private myContext: Context;
    private mysignindao: null;
    private mydaos: Array<BaseDAO> = new Array();

    constructor(context: Context) {
        this.myContext = context;

        this.createDAOs();

        this.load();

        this.afterLoaded();

    }

    private createDAOs() {
        this.mydaos.push(this.mysignindao);
    }

    private load() {
        this.mydaos.forEach((dao) => {
            dao.load(this.context, this.mysignindao);
        });
    }

    private afterLoaded() {
        this.mydaos.forEach((dao) => {
            dao.afterLoaded();
        });
    }

    public get context(): Context {
        return this.myContext;
    }

    public set context(value) {
        throw new Error("Cannot be write context, use the constructor");
    }

   
    public get signinDAO(): null {
        return this.mysignindao;
    }

     
    public set signinDAO(value: null) {
        throw new Error("Property only reading");
    }
}
