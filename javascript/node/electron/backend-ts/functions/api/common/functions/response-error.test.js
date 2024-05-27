"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_error_1 = require("./response-error");
const common_error_1 = require("../common-error");
test("Error 40401 test", () => {
    const taulukkoErr = new common_error_1.TaulukkoError("Error test", 40401);
    let responseErr = new response_error_1.ResponseError(taulukkoErr);
    expect(responseErr.status).toBe(404);
    expect(responseErr.substatus).toBe(1);
    expect(responseErr.message).toBe("Error test");
    responseErr = new response_error_1.ResponseError(null, "Error test 2", 500, 2);
    expect(responseErr.status).toBe(500);
    expect(responseErr.substatus).toBe(2);
    expect(responseErr.message).toBe("Error test 2");
});
//# sourceMappingURL=response-error.test.js.map