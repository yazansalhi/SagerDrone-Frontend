export default {
    isAuth(state) {
        return state.token;
    },
    getUserId(state) {
        return state.userId;
    },
    getUserEmail(state) {
        return state.email;
    },
    getUserName(state) {
        return state.name;
    },
}