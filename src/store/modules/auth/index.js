import authActions from './actions.js';
import authGetters from './getters.js';
import authMutations from './mutations.js';

const auth = {
    namespaced: true,
    state() {
        return {
            userId: null,
            token: null,
            didAutoLogout: false
        };
    },
    mutations: authMutations,
    actions: authActions,
    getters: authGetters
};

export default auth;