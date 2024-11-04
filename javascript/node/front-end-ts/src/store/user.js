export default {
    state: {
        id: "", logged: false, accesslevel: 100, image: "", name: "", self: "",
        campaignsiown: new Array(), allcampaigns: new Array()
    },
    getters: {
        image(state) {
            if (state.user.image) {
                return state.user.image;
            }
            return state.constants.DEFAULT_IMAGE;
        },
    }
};
//# sourceMappingURL=user.js.map