import { StringsUtil as StringsUtilLib } from "../common/util/strings";

const StringsUtil: StringsUtilLib = new StringsUtilLib();

describe("JSON test", () => {
    beforeEach(() => {
        jest.setTimeout(10000);
    });

    test("parse", () => {
        expect(JSON.parse("3")).toBe(3);
        expect(JSON.parse(`{"age":35}`)).toStrictEqual({ age: 35 });
        expect(JSON.parse(`{"name":"Edson","age":35}`)).toStrictEqual({ name: "Edson", age: 35 });

        expect(() => { JSON.parse(`{age:35}`); }).toThrowError("Unexpected token a in JSON at position 1");
        expect(() => { JSON.parse(`{"name":'Edson'}`); }).toThrowError("Unexpected token ' in JSON at position 8");
        expect(() => { JSON.parse("Edson"); }).toThrowError("Unexpected token E in JSON at position 0");
        expect(() => { JSON.parse(""); }).toThrowError("Unexpected end of JSON input");
    });

});
