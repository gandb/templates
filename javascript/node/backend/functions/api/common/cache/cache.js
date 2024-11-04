"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeCache = require("node-cache");
class Cache {
    constructor(stdTTL, checkPeriod) {
        if (!stdTTL) {
            stdTTL = 1000;
        }
        if (!checkPeriod) {
            checkPeriod = 1000;
        }
        this.cache = new NodeCache({ stdTTL, checkperiod: checkPeriod });
    }
    set(key, value, ttl, callback) {
        this.cache.set(key, value, ttl ? Math.round(ttl / 1000) : null, callback);
    }
    get(key, callback) {
        return this.cache.get(key, callback);
    }
    del(key, callback) {
        return this.cache.del(key, callback);
    }
    ttl(key, ttl) {
        if (ttl) {
            return this.cache.ttl(key, ttl ? Math.round(ttl / 1000) : null);
        }
        return this.cache.getTtl(key) - Date.now();
    }
}
exports.Cache = Cache;
//# sourceMappingURL=cache.js.map