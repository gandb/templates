import { default as SemaphoreBuilder } from "semaphore";
export class Case {
    constructor() {
        this.tests = new Array();
        this.sempaphore = SemaphoreBuilder(0);
        this.onRun = false;
    }
    logHead(value) {
        console.log("============================================================");
        if (value instanceof Array) {
            for (let val of value) {
                console.log("==   " + val + "   ==");
            }
        }
        else {
            console.log("==   " + value + "   ==");
        }
        console.log("============================================================");
    }
    getTestNames() {
        let ret = "";
        for (let test of this.tests) {
            if (ret != "") {
                ret += ",";
            }
            ret += test.name;
        }
        return ret;
    }
    addTest(name, test) {
        if (this.onRun) {
            throw new Error("Can't add test after start run the case");
        }
        this.tests.push({ name, fineFunction: () => {
                // console.log("Case",200);
            }, function: test });
        this.sempaphore = SemaphoreBuilder(this.tests.length);
        return this;
    }
    run() {
        this.onRun = true;
        this.logHead(["Starting case, total tests : " + this.tests.length,
            "Tests: " + this.getTestNames()]);
        let successCount = 0;
        for (let task of this.tests) {
            this.sempaphore.take(() => {
                task.function().then((success) => {
                    if (!success) {
                        this.logHead(task.name + " run with errors.");
                    }
                    successCount = successCount + ((success) ? 1 : 0);
                    task.fineFunction();
                    this.sempaphore.leave();
                });
            });
        }
        setInterval(() => {
            if (this.sempaphore.available(this.tests.length)) {
                this.logHead([
                    "Success tests : " + successCount,
                    "Error tests : " + (this.tests.length - successCount)
                ]);
                this.logHead("Case end");
                process.exit(0);
            }
        }, 100);
    }
}
//# sourceMappingURL=taulukko-test.js.map