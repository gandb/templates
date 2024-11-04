import { StringsUtil } from "./strings";
class DatesUtil {
    constructor() {
        this.stringUtil = new StringsUtil();
    }
    addDays(date, days) {
        const ret = new Date(date);
        ret.setDate(date.getDate() + days);
        return ret;
    }
    addHours(date, hours) {
        const ret = new Date(date);
        ret.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        return ret;
    }
    parseYYYYMMDD(dateStr) {
        if (dateStr.length !== 8) {
            throw new Error("Date format YYYYMMDD incorrect!");
        }
        return this.parseYYYYMMDDHHMMSSMMM(dateStr + "000000000");
    }
    parseYYYYMMDDHHMMSSMMM(dateStr) {
        if (dateStr.length !== 17) {
            throw new Error("Date format YYYYMMDDHHMMSSMMM incorrect!");
        }
        const YYYYMMDD = this.stringUtil.left(dateStr, 8);
        const yearStr = this.stringUtil.left(YYYYMMDD, 4);
        if (isNaN(yearStr)) {
            throw new Error("Year must be numeric integer");
        }
        const monthStr = this.stringUtil.right(this.stringUtil.left(YYYYMMDD, 6), 2);
        if (isNaN(monthStr)) {
            throw new Error("Month must be numeric integer");
        }
        const dayStr = this.stringUtil.right(YYYYMMDD, 2);
        if (isNaN(dayStr)) {
            throw new Error("Day must be numeric integer");
        }
        const HHMMSSMMM = this.stringUtil.right(dateStr, 9);
        const hourStr = this.stringUtil.left(HHMMSSMMM, 2);
        if (isNaN(hourStr)) {
            throw new Error("Hour must be numeric integer");
        }
        const minuteStr = this.stringUtil.right(this.stringUtil.left(HHMMSSMMM, 4), 2);
        if (isNaN(minuteStr)) {
            throw new Error("Minute must be numeric integer");
        }
        const secondStr = this.stringUtil.right(this.stringUtil.left(HHMMSSMMM, 6), 2);
        if (isNaN(secondStr)) {
            throw new Error("Second must be numeric integer");
        }
        const milisecondStr = this.stringUtil.right(HHMMSSMMM, 3);
        if (isNaN(milisecondStr)) {
            throw new Error("Milisecond must be numeric integer");
        }
        return this.parse(parseInt(yearStr, 10), parseInt(monthStr, 10), parseInt(dayStr, 10), parseInt(hourStr, 10), parseInt(minuteStr, 10), parseInt(secondStr, 10), parseInt(milisecondStr, 10));
    }
    parse(year, month, day, hour, minute, second, milisec) {
        const date = new Date(year, month - 1, day);
        const h = (hour) ? hour : 0;
        const min = (minute) ? minute : 0;
        const sec = (second) ? second : 0;
        const ms = (milisec) ? milisec : 0;
        date.setHours(h, min, sec, ms);
        return date;
    }
    getYear(date) {
        return date.getFullYear();
    }
    getMonth(date) {
        return date.getMonth() + 1;
    }
    getMonthIndex(date) {
        return date.getMonth();
    }
    getDay(date) {
        return date.getDate();
    }
    getDayOfWeak(date) {
        return date.getDay() + 1;
    }
    getDayOfWeakIndex(date) {
        return date.getDay();
    }
}
export { DatesUtil };
//# sourceMappingURL=dates.js.map