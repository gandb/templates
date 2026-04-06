import { StringsUtil } from "./strings";

class DatesUtil {

    private stringUtil: StringsUtil = new StringsUtil();

    public addDays(date: Date, days: number): Date {
        const ret: Date = new Date(date);
        ret.setDate(date.getDate() + days);
        return ret;
    }

    public addHours(date: Date, hours: number): Date {
        const ret: Date = new Date(date);
        ret.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        return ret;
    }

    public parseYYYYMMDD(dateStr: string): Date {
        if (dateStr.length !== 8) {
            throw new Error("Date format YYYYMMDD incorrect!");
        }

        return this.parseYYYYMMDDHHMMSSMMM(dateStr + "000000000");
    }

    public parseYYYYMMDDHHMMSSMMM(dateStr: string): Date {
        if (dateStr.length !== 17) {
            throw new Error("Date format YYYYMMDDHHMMSSMMM incorrect!");
        }

        const YYYYMMDD: string = this.stringUtil.left(dateStr, 8);

        const yearStr: string = this.stringUtil.left(YYYYMMDD, 4);

        if (isNaN(yearStr as any)) {
            throw new Error("Year must be numeric integer");
        }

        const monthStr: string = this.stringUtil.right(this.stringUtil.left(YYYYMMDD, 6), 2);

        if (isNaN(monthStr as any)) {
            throw new Error("Month must be numeric integer");
        }

        const dayStr: string = this.stringUtil.right(YYYYMMDD, 2);

        if (isNaN(dayStr as any)) {
            throw new Error("Day must be numeric integer");
        }

        const HHMMSSMMM: string = this.stringUtil.right(dateStr, 9);

        const hourStr: string = this.stringUtil.left(HHMMSSMMM, 2);

        if (isNaN(hourStr as any)) {
            throw new Error("Hour must be numeric integer");
        }

        const minuteStr: string = this.stringUtil.right(this.stringUtil.left(HHMMSSMMM, 4), 2);

        if (isNaN(minuteStr as any)) {
            throw new Error("Minute must be numeric integer");
        }

        const secondStr: string = this.stringUtil.right(this.stringUtil.left(HHMMSSMMM, 6), 2);

        if (isNaN(secondStr as any)) {
            throw new Error("Second must be numeric integer");
        }

        const milisecondStr: string = this.stringUtil.right(HHMMSSMMM, 3);

        if (isNaN(milisecondStr as any)) {
            throw new Error("Milisecond must be numeric integer");
        }

        return this.parse(parseInt(yearStr, 10), parseInt(monthStr, 10), parseInt(dayStr, 10),
            parseInt(hourStr, 10), parseInt(minuteStr, 10), parseInt(secondStr, 10), parseInt(milisecondStr, 10));
    }

    public parse(year: number, month: number, day: number,
        hour?: number, minute?: number, second?: number, milisec?: number) {
        const date: Date = new Date(year, month - 1, day);
        const h = (hour) ? hour : 0;
        const min = (minute) ? minute : 0;
        const sec = (second) ? second : 0;
        const ms = (milisec) ? milisec : 0;
        date.setHours(h, min, sec, ms);
        return date;
    }

    public getYear(date: Date): number {
        return date.getFullYear();
    }

    public getMonth(date: Date): number {
        return date.getMonth() + 1;
    }

    public getMonthIndex(date: Date): number {
        return date.getMonth();
    }

    public getDay(date: Date): number {
        return date.getDate();
    }

    public getDayOfWeak(date: Date): number {
        return date.getDay() + 1;
    }

    public getDayOfWeakIndex(date: Date): number {
        return date.getDay();
    }

}

export { DatesUtil };
