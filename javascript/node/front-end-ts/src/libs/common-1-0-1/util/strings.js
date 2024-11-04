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
    buildLetters(fullnames, size) {
        let ret = new Map();
        fullnames.forEach((fullname, key, map) => {
            let needSearchOtherLetter = true;
            let letter = "";
            let tries = 1;
            let conflictName = "";
            while (needSearchOtherLetter) {
                letter = this.buildLetter(fullname, size, tries);
                needSearchOtherLetter = false;
                ret.forEach((value, key, map) => {
                    const conflict = value == letter;
                    if (conflict) {
                        needSearchOtherLetter = true;
                        tries++;
                        conflictName = value;
                    }
                });
            }
            ret.set(key, letter);
        });
        return ret;
    }
    buildLetter(fullname, size, tries = 1) {
        const maxtries = fullname.length + 9;
        if (maxtries < tries) {
            throw new Error("Cant create the letters without conflict");
        }
        if (fullname == null || fullname.trim().length == 0) {
            console.error("Fulname cannot be empty " + fullname);
            throw new Error("Fulname cannot be empty " + fullname);
        }
        fullname = fullname.trim();
        let ret = "";
        let names = fullname.split(" ");
        let lastNameTried = names.length - 1;
        let lastname = names[names.length - 1];
        const maxStartLetterTries = names.length;
        let candidateTry = 1;
        for (let name of names) {
            if (name.trim() != "") {
                const candidate = name.substring(0, 1).toUpperCase();
                const isntLastLetter = ret.length < (size - 1);
                if (candidateTry >= tries || isntLastLetter) {
                    ret += candidate;
                }
                else {
                    candidateTry++;
                }
            }
            if (ret.length == size) {
                break;
            }
        }
        if (ret.length == size) {
            return ret;
        }
        while (ret.length < size && lastNameTried >= 0 && candidateTry < maxtries) {
            let accumulativeSubLettesr = 0;
            if (lastname.length > 1) {
                let startIndex = 1;
                while (startIndex < lastname.length && candidateTry < maxtries && ret.length < size) {
                    accumulativeSubLettesr++;
                    const candidate = lastname.substring(startIndex, startIndex + 1).toUpperCase();
                    if (candidateTry >= tries) {
                        ret += candidate;
                        startIndex++;
                    }
                    else {
                        startIndex++;
                        candidateTry++;
                    }
                }
                const cantContinue = startIndex >= lastname.length && ret.length != size;
                if (cantContinue) {
                    lastNameTried--;
                }
            }
            else {
                lastNameTried--;
            }
            if (lastNameTried >= 0) {
                lastname = names[lastNameTried];
            }
        }
        if (ret.length == size) {
            return ret;
        }
        let index = 1;
        while (ret.length < size && index < 10) {
            const candidate = index.toString();
            //accept 9 numbers
            if (candidateTry >= tries) {
                ret += candidate;
                break;
            }
            else {
                candidateTry++;
                index++;
            }
        }
        if (ret.length == size) {
            return ret;
        }
        if (ret.length < size) {
            throw new Error("Cant create the letters");
        }
        return ret;
    }
}
export { StringsUtil };
//# sourceMappingURL=strings.js.map