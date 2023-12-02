"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("./process");
const process = new process_1.Process();
class Test {
    constructor() {
        this.result = 1;
    }
    // work
    returnOne() {
        return this.result;
    }
    // work
    returnTwo() {
        const x = { retornar: () => this.result };
        return x.retornar() * 2;
    }
    // not work
    returnThree() {
        const x = {};
        // Wrong ! Into x function, this is x
        x.retornar = function () { return this.result; };
        return x.retornar() * 3;
    }
    subReturn(n) {
        return this.result * n;
    }
    // not work
    returnFour() {
        // Wrong ! Into x , this is x and subReturn not exist into x
        const x = { retornar: this.subReturn };
        return x.retornar(4);
    }
    // work
    returnFive() {
        const x = { retornar: (n) => this.subReturn(n) };
        return x.retornar(5);
    }
}
describe("Process test", () => {
    beforeEach(() => {
        jest.setTimeout(10000);
    });
    test("build", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const t = new Test();
        expect(process.build()).toBe(1);
        expect(process.build()).toBe(2);
        expect(process.build()).toBe(3);
        const arrowFunction = () => {
            expect(process.build()).toBe(4);
            expect(process.build()).toBe(5);
            expect(process.build()).toBe(6);
        };
        arrowFunction();
        function anotherFunction(p) {
            expect(p.build()).toBe(7);
            expect(p.build()).toBe(8);
            expect(p.build()).toBe(9);
        }
        anotherFunction(process);
        setTimeout(() => {
            expect(process.build()).toBe(10);
            expect(process.build()).toBe(11);
            expect(process.build()).toBe(12);
            done();
        }, 100);
    }));
});
//# sourceMappingURL=proccess.test.js.map