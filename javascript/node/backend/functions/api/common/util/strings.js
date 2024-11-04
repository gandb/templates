"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringsUtil {
    contains(str, value) {
        if (value.length > str.length) {
            return false;
        }
        return str.indexOf(value) >= 0;
    }
    startsWith(str, value) {
        if (value.length > str.length) {
            return false;
        }
        const part = this.left(str, value.length);
        return part === value;
    }
    endsWith(str, value) {
        if (value.length > str.length) {
            return false;
        }
        const part = this.right(str, value.length);
        return part === value;
    }
    left(str, n) {
        if (n <= 0) {
            return "";
        }
        else if (n > str.length) {
            return str;
        }
        else {
            return str.substring(0, n);
        }
    }
    trim(str) {
        return str.replace(/^\s*|\s*$/g, "");
    }
    right(str, n) {
        if (n <= 0) {
            return "";
        }
        else if (n > str.length) {
            return str;
        }
        else {
            const iLen = str.length;
            return str.substring(iLen, iLen - n);
        }
    }
    repeat(str, n, separator) {
        let ret = "";
        for (let index = 0; index < n; index++) {
            if (index > 0) {
                ret += separator;
            }
            ret += str;
        }
        return ret;
    }
    leftPadding(str, n, paddingValue) {
        const emptyBlock = this.repeat(paddingValue, n, "");
        str = emptyBlock + str;
        return this.right(str, n);
    }
    rightPadding(str, n, paddingValue) {
        const emptyBlock = this.repeat(paddingValue, n, "");
        str += emptyBlock;
        return this.left(str, n);
    }
    count(str, find) {
        const arr = str.split(find);
        return arr.length - 1;
    }
    hashNumber(str) {
        let hashCode = 0;
        let i;
        let chr;
        if (str.length === 0) {
            return hashCode;
        }
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            // tslint:disable-next-line
            hashCode = ((hashCode << 5) - hashCode) + chr;
            // tslint:disable-next-line
            hashCode |= 0; // Convert to 32bit integer
        }
        return hashCode;
    }
    hashString(str) {
        return this.hashNumber(str).toString(36);
    }
}
exports.StringsUtil = StringsUtil;
//# sourceMappingURL=strings.js.map