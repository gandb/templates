import { StringsUtil as StringsUtilLib } from "../common/util/strings";

const StringsUtil: StringsUtilLib = new StringsUtilLib();

class Test {

    private result: number = 1;

    // work
    public returnOne(): number {
        return this.result;
    }

    // work
    public returnTwo() {
        const x = { retornar: () => this.result };
        return x.retornar() * 2;
    }

    // not work
    public returnThree() {
        const x: any = {};
        // Wrong ! Into x function, this is x
        x.retornar = function() { return this.result; };
        return x.retornar() * 3;
    }

    public subReturn(n: number) {
        return this.result * n;
    }

    // not work
    public returnFour() {
        // Wrong ! Into x , this is x and subReturn not exist into x
        const x: any = { retornar: this.subReturn };
        return x.retornar(4);
    }

    // work
    public returnFive() {
        const x: any = { retornar: (n: number) => this.subReturn(n) };
        return x.retornar(5);
    }
}

describe("Arrow test", () => {
    beforeEach(() => {
        jest.setTimeout(10000);
    });

    test("parse", async () => {
        const t = new Test();

        expect(t.returnOne()).toBe(1);
        expect(t.returnTwo()).toBe(2);
        expect(t.returnThree()).toBe(NaN);
        expect(t.returnFour()).toBe(NaN);
        expect(t.returnFive()).toBe(5);

    });

});
