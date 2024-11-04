"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Assert {
    constructor() {
        this._result = null;
        this._stop = false;
    }
    checkIfCanAssert() {
        if (this._stop) {
            throw Error("Assert after stoped!");
        }
    }
    start() {
        this._stop = false;
    }
    stop() {
        this._stop = true;
    }
    error(error1, error2 = undefined) {
        this.checkIfCanAssert();
        const previousError = this._result != null;
        if (previousError) {
            return;
        }
        if (error2) {
            if (error1 instanceof Error) {
                this._result = "Error1 :" + error1.message + " - Error2:" + error2.message;
            }
            else {
                this._result = error1 + " - " + error2.message;
            }
        }
        else if (error1 instanceof Error) {
            this._result = error1.message;
        }
        else {
            this._result = error1;
        }
    }
    equals(title, expected, received) {
        this.checkIfCanAssert();
        const previousError = this._result != null;
        if (previousError) {
            return;
        }
        if (expected != received) {
            this._result = `Expected [${expected}] received [${received}]`;
        }
    }
    notEquals(title, notExpected, received) {
        this.checkIfCanAssert();
        const previousError = this._result != null;
        if (previousError) {
            return;
        }
        if (notExpected == received) {
            this._result = `Not expected [${received}]`;
        }
    }
    isTrue(title, received) {
        this.equals(title, true, received);
    }
    isFalse(title, received) {
        this.equals(title, false, received);
    }
    isNull(title, received) {
        this.equals(title, null, received);
    }
    isNotNull(title, received) {
        this.checkIfCanAssert();
        const previousError = this._result != null;
        if (previousError) {
            return;
        }
        if (received == null) {
            this._result = `Expected [not null] received [null]`;
        }
    }
    notContain(title, received, content) {
        this.checkIfCanAssert();
        const previousError = this._result != null;
        if (previousError) {
            return;
        }
        if (received.indexOf(content) > -1) {
            this._result = `Expected the value [${received}] not contain [${content}]`;
        }
    }
    contain(title, received, content) {
        this.checkIfCanAssert();
        const previousError = this._result != null;
        if (previousError) {
            return;
        }
        if (received.indexOf(content) < 0) {
            this._result = `Expected the value [${received}] contain [${content}]`;
        }
    }
    get result() {
        return this._result;
    }
}
exports.Assert = Assert;
//# sourceMappingURL=Assert.js.map