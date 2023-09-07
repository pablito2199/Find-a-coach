import requestsActions from './actions.js';
import requestsGetters from './getters.js';
import requestsMutations from './mutations.js';

const requestsModule = {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },
    mutations: requestsMutations,
    actions: requestsActions,
    getters: requestsGetters

};

export default requestsModule;