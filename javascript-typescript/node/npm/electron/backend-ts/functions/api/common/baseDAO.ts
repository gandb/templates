import { Context } from "./http-server";
import { IFactoryDAO } from "./IFactoryDAO";
import * as firebase from "firebase-admin";
export class BaseDAO {

    private loaded: boolean = false;
    private mycontext: Context;
    private myfactory: IFactoryDAO;


    constructor() {
            if (!firebase.apps.length) {
                // Initialize Firebase
                firebase.initializeApp(); 
        }
    }

    /* tslint:disable:no-empty*/
    public afterLoaded() { }

    public load(context: Context, factory: IFactoryDAO) {
        if (this.loaded) {
            throw new Error("Already loaded");
        }
        this.loaded = true;
        this.mycontext = context;
        this.myfactory = factory;
    }

    public get context(): Context {
        return this.mycontext;
    }
    public get factory(): IFactoryDAO {
        return this.myfactory;
    }
}
