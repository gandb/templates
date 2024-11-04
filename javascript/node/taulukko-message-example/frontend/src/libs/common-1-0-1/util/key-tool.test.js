import { KeyTool } from "./key-tool";
/*async test
 test("[GET] /", async () => {
  const res = await req(server).get("/");
  expect(res.text).toBe("Hello ts-node!");
});

*/
const keyTool = new KeyTool();
const key = keyTool.build(1, 1);
test(`build testing key: ${key}`, () => {
    expect(key.length).toBe(53);
});
test(`build testing unique key`, () => {
    const keys = new Set();
    for (let i = 0; i < 50; i++) {
        const k11 = keyTool.build(1, 1);
        const k12 = keyTool.build(1, 2);
        const k21 = keyTool.build(2, 1);
        const k22 = keyTool.build(2, 2);
        expect(keys.has(k11)).toBe(false);
        expect(keys.has(k12)).toBe(false);
        expect(keys.has(k21)).toBe(false);
        expect(keys.has(k22)).toBe(false);
        keys.add(k11);
        keys.add(k12);
        keys.add(k21);
        keys.add(k22);
    }
});
//# sourceMappingURL=key-tool.test.js.map