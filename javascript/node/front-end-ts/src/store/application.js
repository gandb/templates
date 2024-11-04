export var GAME_SCREEN;
(function (GAME_SCREEN) {
    GAME_SCREEN[GAME_SCREEN["TP_NULL"] = -1] = "TP_NULL";
    GAME_SCREEN[GAME_SCREEN["TP_FULLSCREEN_ANSWER"] = 0] = "TP_FULLSCREEN_ANSWER";
    GAME_SCREEN[GAME_SCREEN["TP_LOAD"] = 1] = "TP_LOAD";
    GAME_SCREEN[GAME_SCREEN["TP_SPLASH"] = 2] = "TP_SPLASH";
    GAME_SCREEN[GAME_SCREEN["TP_PLAY"] = 3] = "TP_PLAY";
})(GAME_SCREEN || (GAME_SCREEN = {}));
export default {
    state: {
        hassplash: false, error: "", confirmationOnExit: false,
        needRedirectPages: ["/subscription"], stateGame: GAME_SCREEN.TP_NULL,
        loadingGame: false
    },
};
//# sourceMappingURL=application.js.map