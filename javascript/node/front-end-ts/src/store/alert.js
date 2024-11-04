import bus from "@/bus";
import router from '../router/index';
//TODO: Criar um subnivel de namespace para game chamado chars
export default {
    namespaced: true,
    state: {},
    getters: {
        chars(state) {
            const ret = new Map();
            if (!state.chars) {
                return ret;
            }
            for (let char of state.chars) {
                ret.set(char.id, char);
            }
            return ret;
        },
        hasSelected(state) {
            if (!state.chars) {
                return false;
            }
            for (let char of state.chars) {
                if (char.selected) {
                    return true;
                }
            }
            return false;
        },
        hasChar(state) {
            if (!state.chars) {
                return false;
            }
            return state.chars.length > 0;
        },
        isGM(state, getters, rootState, rootGetters) {
            return state.gmid == rootState.user.id;
        },
        firstCharSelected(state) {
            for (let char of state.chars) {
                if (char.selected) {
                    return char;
                }
            }
            return null;
        },
        charsByUserId(state) {
            const ret = new Map();
            for (let char of state.chars) {
                ret.set(char.userid, char);
            }
            return ret;
        },
    },
    mutations: {
        selectFirst(state) {
            if (state.chars.length == 0) {
                return;
            }
            state.chars[0].selected = true;
        },
    },
    actions: {
        insertAlert(context, alert) {
            console.log("insertAlert:100 =>", alert);
            bus.api.put('/alert', alert)
                .then((response) => {
                console.log("insertAlert:200 =>", response.data);
                /* bill = response.data  as BillDTO;
                  context.dispatch("updateMyBill",bill);
                  */
                router.push("/");
            })
                .catch((error) => {
                // handle error
                console.log("inserido com erro!", error);
            });
        },
        /*BEGIN EXEMPLOS (LIXO)*/
        unselectAllChars(context) {
            context.commit("unselectAllChars");
        },
    }
};
//# sourceMappingURL=alert.js.map