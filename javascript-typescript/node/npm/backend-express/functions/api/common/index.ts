 
import {
    CONTEXT_CLIENT_ID,CONTEXT_CLIENT_KEY, CONTEXT_TOKEN_USER, CONTEXT_CLUSTER_ID,
    CONTEXT_PROCESS_ID,
} from "./functions/context-vars";
import { MiddlewareManager } from "./functions/midlleware"; 
import {
    ERR_UNKNOWN_MESSAGE, ERR_APP_ID_NOT_FOUND, ERR_SESSION_INVALID,
    CODE_REQUEST_INVALID, CODE_SESSION_INVALID, CODE_ACCESS_DENIED,
    CODE_NOT_FOUND, CODE_UNKNOWN_MESSAGE,
} from "./functions/error-msgs";

const contextVarNames = {
    CONTEXT_CLIENT_ID,CONTEXT_CLIENT_KEY, CONTEXT_TOKEN_USER,
    CONTEXT_CLUSTER_ID, CONTEXT_PROCESS_ID,
};

const errorCodes = {
    CODE_REQUEST_INVALID, CODE_SESSION_INVALID, CODE_ACCESS_DENIED,
    CODE_NOT_FOUND, CODE_UNKNOWN_MESSAGE,
};

const errorMessages = { ERR_UNKNOWN_MESSAGE, ERR_APP_ID_NOT_FOUND, ERR_SESSION_INVALID };

export { 
    MiddlewareManager, contextVarNames,
    errorCodes, errorMessages,
};
