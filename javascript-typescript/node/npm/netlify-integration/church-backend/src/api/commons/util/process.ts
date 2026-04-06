import { StringsUtil } from "./strings";

// 53 caracteres  12 (by version , cluster and Thread) - 8 (by random) - 31 (by clock)

class Process {

    public build(): number {

        const lastProcessId: number = (global as any).lastProcessId;
        let processId = lastProcessId;

        if (!processId) {
            processId = 1;
        } else {
            processId++;
        }

        (global as any).lastProcessId = processId;

        return processId;
    }
}

export { Process };
