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
const cache_1 = require("./cache");
describe("Cache tests", () => {
    beforeEach(() => {
        jest.setTimeout(5000);
    });
    test("Set and Get", () => {
        const cache = new cache_1.Cache();
        cache.set("age", 35);
        cache.set("name", "Xisto");
        expect(cache.get("age")).toBe(35);
        expect(cache.get("age")).not.toBe(33);
        expect(cache.get("name")).toBe("Xisto");
        expect(cache.get("wrong")).toBe(undefined);
    });
    test("Set and Get using TTL", () => __awaiter(void 0, void 0, void 0, function* () {
        const cache = new cache_1.Cache();
        const buildPromisse = () => new Promise((resolve, reject) => {
            setTimeout(() => resolve(true), 1100);
        });
        cache.set("age", 35, 1000);
        expect(cache.get("age")).toBe(35);
        expect(cache.get("age")).not.toBe(33);
        const result = yield buildPromisse();
        expect(result).toBeTruthy();
        expect(cache.get("age")).not.toBe(35);
    }));
    test("Set, Get And Del", () => {
        const cache = new cache_1.Cache();
        cache.set("age", 35);
        expect(cache.get("age")).toBe(35);
        cache.del("age");
        expect(cache.get("age")).not.toBe(35);
    });
    test("TTL operations", () => __awaiter(void 0, void 0, void 0, function* () {
        const cache = new cache_1.Cache();
        const buildPromisse = () => new Promise((resolve, reject) => {
            setTimeout(() => resolve(true), 1100);
        });
        cache.set("age", 35, 1000);
        expect(cache.ttl("age")).toBeGreaterThan(0);
        cache.ttl("age", 2000);
        expect(cache.ttl("age")).toBeGreaterThan(1000);
        expect(cache.get("age")).toBe(35);
        expect(cache.get("age")).not.toBe(33);
        let result = yield buildPromisse();
        expect(result).toBeTruthy();
        expect(cache.get("age")).toBe(35);
        expect(cache.get("age")).not.toBe(33);
        result = yield buildPromisse();
        expect(result).toBeTruthy();
        expect(cache.get("age")).not.toBe(35);
    }));
});
