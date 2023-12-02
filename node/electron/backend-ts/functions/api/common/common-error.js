"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaulukkoError = void 0;
class TaulukkoError extends Error {
    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code;
    }
}
exports.TaulukkoError = TaulukkoError;
//# sourceMappingURL=common-error.js.map