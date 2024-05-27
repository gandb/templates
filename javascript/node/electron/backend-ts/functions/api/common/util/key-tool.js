"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyTool = void 0;
const strings_1 = require("./strings");
const uuidv4 = require("uuid/v4");
const uuidv1 = require("uuid/v1");
// 53 caracteres  12 (by version , cluster and Thread) - 8 (by random) - 31 (by clock)
const RADIX_BASE = 36;
const VERSION = "10";
class KeyTool {
    constructor() {
        this.stringUtil = new strings_1.StringsUtil();
    }
    build(cluster, proccessID) {
        if (cluster === undefined) {
            cluster = Math.round(Math.random() * 1000) % 1000;
        }
        if (proccessID === undefined) {
            proccessID = Math.round(Math.random() * 100000) % 100000;
        }
        if (cluster >= 1000 || cluster < 0) {
            throw new Error("Cluster must be between 0-999");
        }
        if (proccessID >= 100000 || cluster < 0) {
            throw new Error("Cluster must be between 0-99999");
        }
        const uuidPart = uuidv1().substring(0, 8) + "-" + uuidv4().substring(0, 31);
        const strKey = VERSION +
            this.stringUtil.right("000" + cluster, 3) +
            this.stringUtil.right("000000" + proccessID, 6) + "--" + uuidPart;
        return strKey;
    }
}
exports.KeyTool = KeyTool;
//# sourceMappingURL=key-tool.js.map