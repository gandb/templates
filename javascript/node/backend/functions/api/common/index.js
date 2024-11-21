"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessages = exports.errorCodes = exports.contextVarNames = exports.MiddlewareManager = void 0;
const context_vars_1 = require("./functions/context-vars");
const midlleware_1 = require("./functions/midlleware");
Object.defineProperty(exports, "MiddlewareManager", { enumerable: true, get: function () { return midlleware_1.MiddlewareManager; } });
const error_msgs_1 = require("./functions/error-msgs");
const contextVarNames = {
    CONTEXT_CLIENT_ID: context_vars_1.CONTEXT_CLIENT_ID, CONTEXT_CLIENT_KEY: context_vars_1.CONTEXT_CLIENT_KEY, CONTEXT_TOKEN_USER: context_vars_1.CONTEXT_TOKEN_USER,
    CONTEXT_CLUSTER_ID: context_vars_1.CONTEXT_CLUSTER_ID, CONTEXT_PROCESS_ID: context_vars_1.CONTEXT_PROCESS_ID,
};
exports.contextVarNames = contextVarNames;
const errorCodes = {
    CODE_REQUEST_INVALID: error_msgs_1.CODE_REQUEST_INVALID, CODE_SESSION_INVALID: error_msgs_1.CODE_SESSION_INVALID, CODE_ACCESS_DENIED: error_msgs_1.CODE_ACCESS_DENIED,
    CODE_NOT_FOUND: error_msgs_1.CODE_NOT_FOUND, CODE_UNKNOWN_MESSAGE: error_msgs_1.CODE_UNKNOWN_MESSAGE,
};
exports.errorCodes = errorCodes;
const errorMessages = { ERR_UNKNOWN_MESSAGE: error_msgs_1.ERR_UNKNOWN_MESSAGE, ERR_APP_ID_NOT_FOUND: error_msgs_1.ERR_APP_ID_NOT_FOUND, ERR_SESSION_INVALID: error_msgs_1.ERR_SESSION_INVALID };
exports.errorMessages = errorMessages;
