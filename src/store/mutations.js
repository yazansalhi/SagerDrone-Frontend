export default{
    authUser(state, userObj) {
        state.token = userObj.token;
        state.email = userObj.email;
        state.name = userObj.name;
        state.userId = userObj.userId;
    },

    clearAuth(state) {
        state.token = null;
        state.email = null;
        state.name = null;
        state.userId = null;
    },
}
