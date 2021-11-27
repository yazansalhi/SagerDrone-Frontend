import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);


const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        token: null,
        email: null,
        userId: null,
        name: null,
    },
    mutations,
    actions,
    getters,
})
export default store;
