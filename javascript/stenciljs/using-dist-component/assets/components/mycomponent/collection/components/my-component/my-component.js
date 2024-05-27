import { format } from '../../utils/utils';
export class MyComponent {
    getText() {
        return format(this.first, this.middle, this.last);
    }
    render() {
        return h("div", { class: "my-component" },
            "Hello, World! Eu sou um ",
            this.getText());
    }
    static get is() { return "my-component"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "first": {
            "type": String,
            "attr": "first"
        },
        "last": {
            "type": String,
            "attr": "last"
        },
        "middle": {
            "type": String,
            "attr": "middle"
        }
    }; }
    static get style() { return "/**style-placeholder:my-component:**/"; }
}
