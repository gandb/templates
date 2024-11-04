"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDAO = void 0;
const firebase = require("firebase-admin");
class BaseDAO {
    constructor() {
        this.loaded = false;
        if (!firebase.apps.length) {
            // Initialize Firebase
            firebase.initializeApp();
        }
    }
    /* tslint:disable:no-empty*/
    afterLoaded() { }
    load(context, factory) {
        if (this.loaded) {
            throw new Error("Already loaded");
        }
        this.loaded = true;
        this.mycontext = context;
        this.myfactory = factory;
    }
    get context() {
        return this.mycontext;
    }
    get factory() {
        return this.myfactory;
    }
}
exports.BaseDAO = BaseDAO;
//# sourceMappingURL=baseDAO.js.map