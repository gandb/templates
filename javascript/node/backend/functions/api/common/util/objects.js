"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectsUtil = void 0;
class ObjectsUtil {
    shallowCopy(data) {
        return JSON.parse(JSON.stringify(data));
    }
    partialCopy(from, to, fields) {
        const ret = this.shallowCopy(to);
        for (const field of fields) {
            ret[field] = from[field];
        }
        return ret;
    }
}
exports.ObjectsUtil = ObjectsUtil;
