import coachesActions from './actions.js';
import coachesGetters from './getters.js';
import coachesMutations from './mutations.js';

const coachesModule = {
    namespaced: true,
    state() {
        return {
            lastFetch: null,
            coaches: []
        }
    },
    mutations: coachesMutations,
    actions: coachesActions,
    getters: coachesGetters

};

export default coachesModule;