"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Test_1 = require("./Test");
const Assert_1 = require("./Assert");
class Case {
    constructor(name) {
        this._tests = new Array();
        this._ident = 0;
        this._name = name;
    }
    genericOutput(output, message, ...optionalParams) {
        let ident = "";
        for (let index = 0; index < this._ident; index++) {
            ident += ">>";
        }
        if (optionalParams[0].length == 0) {
            output(ident, message);
        }
        else if (optionalParams[0].length == 1) {
            output(ident, message, optionalParams[0][0]);
        }
        else {
            output(ident, message, optionalParams[0][0], optionalParams[0][1]);
        }
    }
    log(message, ...optionalParams) {
        this.genericOutput(console.log, message, optionalParams);
    }
    error(message, ...optionalParams) {
        this.genericOutput(console.error, message, optionalParams);
    }
    test(name) {
        const test = new Test_1.Test(this, name);
        this._tests.push(test);
        return test;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.log(`Running Case Test [${this._name}]`);
            this._ident++;
            const testsLength = this._tests.length;
            let testsSuccess = 0;
            for (let test of this._tests) {
                this.log(`=====================`);
                this.log(`Running Test [${test.name}]`);
                this._ident++;
                const assert = new Assert_1.Assert();
                assert.start();
                yield test.requestTest(assert);
                assert.stop();
                if (!assert.result) {
                    this.log(`Test OK `);
                    testsSuccess++;
                }
                else {
                    this.error(`Error : [${assert.result}]`);
                }
                this._ident--;
            }
            this._ident--;
            this.log(`==========================================`);
            this.log(`===                                    ===`);
            this.log(`===  Tests with errors:${testsLength - testsSuccess}`);
            this.log(`===  Tests with success:${testsSuccess}`);
            this.log(`===  Total tests:${testsLength}`);
            this.log(`===                                    ===`);
            this.log(`==========================================`);
        });
    }
}
exports.Case = Case;
//# sourceMappingURL=CaseTest.js.map