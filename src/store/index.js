import { createStore } from 'vuex';

import authModule from './modules/auth/index.js';
import coachesModule from './modules/coaches/index.js';
import requestsModule from './modules/requests/index.js';

const store = createStore({
    modules: {
        auth: authModule,
        coaches: coachesModule,
        requests: requestsModule
    }
});

export default store;