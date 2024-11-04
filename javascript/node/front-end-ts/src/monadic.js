export class Monadic {
    constructor(selector) {
        this.selector = this.objToSelector(selector);
        this.selector = (this.selector === "") ? "BODY" : this.selector;
    }
    objToSelector(selector) {
        if (typeof selector === "string") {
            return selector;
        }
        if (selector === document) {
            return "";
        }
        const element = selector;
        let ix = 0;
        if (element == undefined || element.parentNode == null) {
            return "";
        }
        let thisPartialSelector = element.tagName;
        element.classList.forEach((className, index) => {
            thisPartialSelector += "." + className;
        });
        let siblings = element.parentNode.childNodes;
        for (var i = 0; i < siblings.length; i++) {
            let sibling = siblings[i];
            if (sibling === element) {
                return this.objToSelector(element.parentNode) + ' ' + thisPartialSelector;
            }
        }
        return "";
    }
    forEach(callbackfn, thisArg) {
        return document.querySelectorAll(this.selector).forEach(callbackfn, thisArg);
    }
    show() {
        this.forEach((element, index) => {
            element.classList.remove("monadic-hide");
        });
        return this;
    }
    hide() {
        this.forEach(function (element, index) {
            element.classList.add("monadic-hide");
        });
        return this;
    }
    html(value) {
        this.forEach(function (element, index) {
            element.innerHTML = value;
        });
        return this;
    }
    onReady(callback) {
        window.onload = callback;
    }
    bind(event, callback) {
        this.forEach((element, index) => { element.addEventListener(event, callback); });
    }
    addClass(className) {
        this.forEach((element, index) => { element.classList.add(className); });
    }
}
export function builder(selector) {
    return new Monadic(selector);
}
//# sourceMappingURL=monadic.js.map