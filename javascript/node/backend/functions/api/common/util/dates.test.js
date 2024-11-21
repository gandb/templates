"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dates_1 = require("./dates");
const DatesUtil = new dates_1.DatesUtil();
// into javascript months use range [0-11]
const JAVASCRIPT_MONTHS = {
    JAN: 0,
    FEB: 1,
    MAR: 2,
    APR: 3,
    MAY: 4,
    JUN: 5,
    JUL: 6,
    AUG: 7,
    SEP: 8,
    OCT: 9,
    NOV: 10,
    DEC: 11,
};
test("Parse date with parseYYYYMMDD", () => {
    expect(DatesUtil.parseYYYYMMDD("20191229")).toEqual(new Date(2019, JAVASCRIPT_MONTHS.DEC, 29));
    expect(DatesUtil.parseYYYYMMDD("20192429")).toEqual(new Date(2020, JAVASCRIPT_MONTHS.DEC, 29));
    expect(DatesUtil.parseYYYYMMDD("20191232")).toEqual(new Date(2020, JAVASCRIPT_MONTHS.JAN, 1));
    expect(() => { DatesUtil.parseYYYYMMDD(""); }).
        toThrowError("Date format YYYYMMDD incorrect!");
    expect(() => { DatesUtil.parseYYYYMMDD("201912"); }).
        toThrowError("Date format YYYYMMDD incorrect!");
    expect(() => { DatesUtil.parseYYYYMMDD("201912012200"); }).
        toThrowError("Date format YYYYMMDD incorrect!");
    expect(() => { DatesUtil.parseYYYYMMDD("ABCD1229"); }).
        toThrowError("Year must be numeric integer");
    expect(() => { DatesUtil.parseYYYYMMDD("2019AB29"); }).
        toThrowError("Month must be numeric integer");
    expect(() => { DatesUtil.parseYYYYMMDD("201919AB"); }).
        toThrowError("Day must be numeric integer");
});
test("Parse date with parseYYYYMMDDHHMMSSMMM", () => {
    const date = new Date(2019, JAVASCRIPT_MONTHS.DEC, 29);
    date.setHours(1);
    date.setMinutes(2);
    date.setSeconds(3);
    date.setMilliseconds(4);
    expect(DatesUtil.parseYYYYMMDDHHMMSSMMM("20191229010203004")).toEqual(date);
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSSMMM(""); }).
        toThrowError("Date format YYYYMMDDHHMMSSMMM incorrect!");
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSSMMM("201912"); }).
        toThrowError("Date format YYYYMMDDHHMMSSMMM incorrect!");
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSSMMM("201912012200"); }).
        toThrowError("Date format YYYYMMDDHHMMSSMMM incorrect!");
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSSMMM("20191229AB0000000"); }).
        toThrowError("Hour must be numeric integer");
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSSMMM("2019122900AB00000"); }).
        toThrowError("Minute must be numeric integer");
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSSMMM("201912290000AB000"); }).
        toThrowError("Second must be numeric integer");
    expect(() => { DatesUtil.parseYYYYMMDDHHMMSSMMM("2019122901020300A"); }).
        toThrowError("Milisecond must be numeric integer");
});
test("Get day", () => {
    const date = new Date(2019, JAVASCRIPT_MONTHS.DEC, 29);
    const nextYear = new Date(2019, JAVASCRIPT_MONTHS.DEC, 32);
    expect(DatesUtil.getDay(date)).toBe(29);
    expect(DatesUtil.getDay(nextYear)).toBe(1);
});
test("Get day of weak index", () => {
    const date = new Date(2019, JAVASCRIPT_MONTHS.JUL, 24);
    expect(DatesUtil.getDayOfWeakIndex(date)).toBe(3);
});
test("Get day of weak", () => {
    const date = new Date(2019, JAVASCRIPT_MONTHS.JUL, 24);
    expect(DatesUtil.getDayOfWeak(date)).toBe(4);
});
test("Get month", () => {
    const date = new Date(2019, JAVASCRIPT_MONTHS.DEC, 29);
    const nextYear = new Date(2019, JAVASCRIPT_MONTHS.DEC, 32);
    expect(DatesUtil.getMonth(date)).toBe(12);
    expect(DatesUtil.getMonth(nextYear)).toBe(1);
});
test("Get month index", () => {
    const date = new Date(2019, JAVASCRIPT_MONTHS.DEC, 29);
    const nextYear = new Date(2019, JAVASCRIPT_MONTHS.DEC, 32);
    expect(DatesUtil.getMonthIndex(date)).toBe(11);
    expect(DatesUtil.getMonthIndex(nextYear)).toBe(0);
});
test("Get year", () => {
    const date = new Date(2019, JAVASCRIPT_MONTHS.DEC, 29);
    const nextYear = new Date(2019, JAVASCRIPT_MONTHS.DEC, 32);
    expect(DatesUtil.getYear(date)).toBe(2019);
    expect(DatesUtil.getYear(nextYear)).toBe(2020);
});
test("Add days ", () => {
    const date = DatesUtil.parse(1990, 5, 1);
    const expectedMajor = DatesUtil.parse(1990, 5, 31);
    const expectedMinor = DatesUtil.parse(1990, 4, 1);
    const expectedBirthDay = DatesUtil.parse(1991, 5, 1);
    expect(DatesUtil.addDays(date, 0)).toEqual(date);
    expect(DatesUtil.addDays(date, 30)).toEqual(expectedMajor);
    expect(DatesUtil.addDays(date, -30)).toEqual(expectedMinor);
    expect(DatesUtil.addDays(date, 365)).toEqual(expectedBirthDay);
});
test("Add hours ", () => {
    const date = DatesUtil.parse(1990, 5, 1, 2, 3, 4, 5);
    const expectedMajor = DatesUtil.parse(1990, 5, 1, 3, 3, 4, 5);
    const expectedMinor = DatesUtil.parse(1990, 5, 1, 1, 3, 4, 5);
    const expectedAnotherDay = DatesUtil.parse(1990, 5, 2, 2, 3, 4, 5);
    expect(DatesUtil.addHours(date, 0)).toEqual(date);
    expect(DatesUtil.addHours(date, 1)).toEqual(expectedMajor);
    expect(DatesUtil.addHours(date, -1)).toEqual(expectedMinor);
    expect(DatesUtil.addHours(date, 24)).toEqual(expectedAnotherDay);
});
