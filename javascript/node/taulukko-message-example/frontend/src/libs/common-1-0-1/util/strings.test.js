import { StringsUtil as StringsUtilLib } from "./strings";
describe("string util functions", () => {
    beforeEach(() => {
        jest.setTimeout(10000);
    });
    /*
    test("startsWith", () => {
        expect(StringsUtil.startsWith("", "")).toBe(true);
        expect(StringsUtil.startsWith("abc", "abc")).toBe(true);
        expect(StringsUtil.startsWith("abc", "ab")).toBe(true);
        expect(StringsUtil.startsWith("abc", "a")).toBe(true);
        expect(StringsUtil.startsWith("abc", "")).toBe(true);
        expect(StringsUtil.startsWith(" abc", "ab")).toBe(false);
        expect(StringsUtil.startsWith("", "abc")).toBe(false);
        expect(StringsUtil.startsWith("a", "abc")).toBe(false);
        expect(StringsUtil.startsWith("ab", "abc")).toBe(false);
        expect(StringsUtil.startsWith(" abc", "abc")).toBe(false);
    });

    test("endsWith", () => {
        expect(StringsUtil.endsWith("", "")).toBe(true);
        expect(StringsUtil.endsWith("abc", "abc")).toBe(true);
        expect(StringsUtil.endsWith("abc", "bc")).toBe(true);
        expect(StringsUtil.endsWith("abc", "c")).toBe(true);
        expect(StringsUtil.endsWith("abc", "")).toBe(true);
        expect(StringsUtil.endsWith("abc ", "bc")).toBe(false);
        expect(StringsUtil.endsWith("", "abc")).toBe(false);
        expect(StringsUtil.endsWith("c", "abc")).toBe(false);
        expect(StringsUtil.endsWith("bc", "abc")).toBe(false);
    });

    test("contains", () => {
        expect(StringsUtil.contains("", "")).toBe(true);
        expect(StringsUtil.contains("abc", "abc")).toBe(true);
        expect(StringsUtil.contains("abc", "bc")).toBe(true);
        expect(StringsUtil.contains("abc", "c")).toBe(true);
        expect(StringsUtil.contains("abc", "")).toBe(true);
        expect(StringsUtil.contains("abc ", "bc")).toBe(true);
        expect(StringsUtil.contains("", "abc")).toBe(false);
        expect(StringsUtil.contains("c", "abc")).toBe(false);
        expect(StringsUtil.contains("bc", "abc")).toBe(false);
    });

    test("left", () => {
        expect(StringsUtil.left("", 3)).toBe("");
        expect(StringsUtil.left("", 0)).toBe("");
        expect(StringsUtil.left("teste", 3)).toBe("tes");
        expect(StringsUtil.left("teste", 10)).toBe("teste");
    });

    test("right", () => {
        expect(StringsUtil.right("", 3)).toBe("");
        expect(StringsUtil.left("", 0)).toBe("");
        expect(StringsUtil.right("teste", 3)).toBe("ste");
        expect(StringsUtil.right("teste", 10)).toBe("teste");
    });

    test("trim", () => {
        expect(StringsUtil.trim("   teste   ")).toBe("teste");
        expect(StringsUtil.trim("   x   teste   x   ")).toBe("x   teste   x");
        expect(StringsUtil.trim("")).toBe("");
        expect(StringsUtil.trim("   ")).toBe("");
    });

    test("repeat", () => {
        expect(StringsUtil.repeat("test", 3, " ")).toBe("test test test");
        expect(StringsUtil.repeat("", 3, "x")).toBe("xx");
        expect(StringsUtil.repeat("x", 3, "")).toBe("xxx");
        expect(StringsUtil.repeat("", 3, "")).toBe("");
    });

    test("leftPadding", () => {
        expect(StringsUtil.leftPadding("test", 7, "x")).toBe("xxxtest");
        expect(StringsUtil.leftPadding("test", 3, "x")).toBe("est");
        expect(StringsUtil.leftPadding("", 0, "x")).toBe("");
        expect(StringsUtil.leftPadding("", -1, "x")).toBe("");
        expect(StringsUtil.leftPadding("", 3, "x")).toBe("xxx");
    });

    test("rightPadding", () => {
        expect(StringsUtil.rightPadding("test", 7, "x")).toBe("testxxx");
        expect(StringsUtil.rightPadding("test", 3, "x")).toBe("tes");
        expect(StringsUtil.rightPadding("", 0, "x")).toBe("");
        expect(StringsUtil.rightPadding("", -1, "x")).toBe("");
        expect(StringsUtil.rightPadding("", 3, "x")).toBe("xxx");
    });

    test("hashNumber", () => {
        expect(StringsUtil.hashNumber("abc")).toBe(96354);
        expect(StringsUtil.hashNumber("123")).toBe(48690);
    });

    test("hashString", () => {
        expect(StringsUtil.hashString("abc")).toBe("22ci");
        expect(StringsUtil.hashString("123")).toBe("11ki");

    });

    test("count", () => {
        expect(StringsUtil.count("abc@def@ghi", "@")).toBe(2);
        expect(StringsUtil.count("abc@def", "@")).toBe(1);
        expect(StringsUtil.count("abc", "@")).toBe(0);
        expect(StringsUtil.count("", "@")).toBe(0);
        expect(StringsUtil.count("@", "@")).toBe(1);
        expect(StringsUtil.count("@@", "@")).toBe(2);
        expect(StringsUtil.count("abc.def.ghi", ".")).toBe(2);
    });

    
*/
    test("buildLetter", () => {
        const StringsUtil = new StringsUtilLib();
        expect(StringsUtil.buildLetter("Edson Vicente", 2, 1)).toBe("EV");
        expect(StringsUtil.buildLetter("Felipe Cesar", 2, 1)).toBe("FC");
        expect(StringsUtil.buildLetter("Felipe Cesar", 2, 2)).toBe("FE");
        expect(StringsUtil.buildLetter("Felipe Cesar", 2, 5)).toBe("FR");
        expect(StringsUtil.buildLetter("Felipe Cesar", 2, 6)).toBe("FE");
        expect(StringsUtil.buildLetter("Felipe Cesar", 2, 7)).toBe("FL");
        expect(StringsUtil.buildLetter("Felipe Cesar", 2, 10)).toBe("FE");
        expect(StringsUtil.buildLetter("Felipe Cesar", 2, 11)).toBe("F1");
        expect(StringsUtil.buildLetter("Felipe Cesar", 2, 19)).toBe("F9");
        expect(() => { StringsUtil.buildLetter("Felipe Cesar", 2, 20); }).toThrow();
    });
    test("buildLetters", () => {
        const StringsUtil = new StringsUtilLib();
        const names = new Map();
        names.set("123", "Edson Vicente");
        let ret = StringsUtil.buildLetters(names, 2);
        expect(ret.get("123")).toBe("EV");
        names.set("124", "Felipe Souza");
        ret = StringsUtil.buildLetters(names, 2);
        expect(ret.get("123")).toBe("EV");
        expect(ret.get("124")).toBe("FS");
        names.set("125", "Felipe Cardoso");
        ret = StringsUtil.buildLetters(names, 2);
        expect(ret.get("123")).toBe("EV");
        expect(ret.get("124")).toBe("FS");
        expect(ret.get("125")).toBe("FC");
        names.set("126", "Felipe Cesar");
        ret = StringsUtil.buildLetters(names, 2);
        expect(ret.get("123")).toBe("EV");
        expect(ret.get("124")).toBe("FS");
        expect(ret.get("125")).toBe("FC");
        expect(ret.get("126")).toBe("FE");
        names.set("127", "Fabio Cesar");
        ret = StringsUtil.buildLetters(names, 2);
        expect(ret.get("123")).toBe("EV");
        expect(ret.get("124")).toBe("FS");
        expect(ret.get("125")).toBe("FC");
        expect(ret.get("126")).toBe("FE");
        expect(ret.get("127")).toBe("FA");
        names.set("128", "G");
        ret = StringsUtil.buildLetters(names, 2);
        expect(ret.get("123")).toBe("EV");
        expect(ret.get("124")).toBe("FS");
        expect(ret.get("125")).toBe("FC");
        expect(ret.get("126")).toBe("FE");
        expect(ret.get("127")).toBe("FA");
        expect(ret.get("128")).toBe("G1");
        names.set("129", "G");
        ret = StringsUtil.buildLetters(names, 2);
        expect(ret.get("123")).toBe("EV");
        expect(ret.get("124")).toBe("FS");
        expect(ret.get("125")).toBe("FC");
        expect(ret.get("126")).toBe("FE");
        expect(ret.get("127")).toBe("FA");
        expect(ret.get("128")).toBe("G1");
        expect(ret.get("129")).toBe("G2");
    });
});
//# sourceMappingURL=strings.test.js.map