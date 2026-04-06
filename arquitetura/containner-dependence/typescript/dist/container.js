"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
class Container {
    constructor() {
        this.services = new Map();
    }
    register(name, implementation) {
        this.services.set(name, implementation);
    }
    resolve(name) {
        const Implementation = this.services.get(name);
        if (!Implementation) {
            throw new Error(`Service ${name} not found`);
        }
        return new Implementation();
    }
}
exports.Container = Container;
//# sourceMappingURL=container.js.map