"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryDAO = void 0;
class FactoryDAO {
    constructor(context) {
        this.mydaos = new Array();
        this.myContext = context;
        this.createDAOs();
        this.load();
        this.afterLoaded();
    }
    createDAOs() {
        this.mydaos.push(this.mysignindao);
    }
    load() {
        this.mydaos.forEach((dao) => {
            dao.load(this.context, this.mysignindao);
        });
    }
    afterLoaded() {
        this.mydaos.forEach((dao) => {
            dao.afterLoaded();
        });
    }
    get context() {
        return this.myContext;
    }
    set context(value) {
        throw new Error("Cannot be write context, use the constructor");
    }
    get signinDAO() {
        return this.mysignindao;
    }
    set signinDAO(value) {
        throw new Error("Property only reading");
    }
}
exports.FactoryDAO = FactoryDAO;
//# sourceMappingURL=FactoryDAO.js.map