// 53 caracteres  12 (by version , cluster and Thread) - 8 (by random) - 31 (by clock)
class Process {
    build() {
        const lastProcessId = global.lastProcessId;
        let processId = lastProcessId;
        if (!processId) {
            processId = 1;
        }
        else {
            processId++;
        }
        global.lastProcessId = processId;
        return processId;
    }
}
export { Process };
//# sourceMappingURL=process.js.map