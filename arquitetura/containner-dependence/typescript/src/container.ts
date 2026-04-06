export class Container {

    private services: Map<string, any>;

    constructor() {
        this.services = new Map();
    }

    register(name: string, implementation: any) {
        this.services.set(name, implementation);
    }

    resolve<T>(name: string): T {
        const Implementation = this.services.get(name);
        if (!Implementation) {
            throw new Error(`Service ${name} not found`);
        }
        return new Implementation() as T;
    }
}

