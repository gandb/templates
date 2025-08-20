import { Process } from "./process";

const process: Process = new Process();

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

describe("Process test", () => {
    beforeEach(() => {
        jest.setTimeout(10000);
    });

    test("build", async (done) => {
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

        function anotherFunction(p: Process) {
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
    });

});
