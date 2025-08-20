"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
class Context {
    constructor(id) {
        this.map = new Map();
        this.id = id;
    }
    set(key, value) {
        this.map.set(key, value);
        console.log("this", this);
    }
    get(key) {
        return this.map.get(key);
    }
    get size() {
        return this.map.size;
    }
    keys() {
        return this.map.keys();
    }
    toString() {
        const ret = { id: this.id };
        let key = null;
        let keys = Array.from(this.map.keys());
        for (let key of keys) {
            const value = this.get(key);
            ret[key] = value;
        }
        return JSON.stringify(ret);
    }
}
exports.Context = Context;
//# sourceMappingURL=context.js.map