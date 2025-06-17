import { ResponseError } from "./response-error";
import { TaulukkoError } from "../common-error";
 
test("Error 40401 test", () => {

    const taulukkoErr: TaulukkoError = new TaulukkoError("Error test", 40401);

    let responseErr: ResponseError = new ResponseError(taulukkoErr);

    expect(responseErr.status).toBe(404);
    expect(responseErr.substatus).toBe(1);
    expect(responseErr.message).toBe("Error test");

    responseErr = new ResponseError(null, "Error test 2", 500, 2);

    expect(responseErr.status).toBe(500);
    expect(responseErr.substatus).toBe(2);
    expect(responseErr.message).toBe("Error test 2");

});
