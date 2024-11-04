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
export { ObjectsUtil };
//# sourceMappingURL=objects.js.map