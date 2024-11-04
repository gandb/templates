"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
class Test {
    constructor(case1, name) {
        this._name = name;
        this._case = case1;
    }
    get name() {
        return this._name;
    }
    get requestTest() {
        return this._requestTest;
    }
    using(requestTest) {
        this._requestTest = requestTest;
        return this._case;
    }
}
exports.Test = Test;
