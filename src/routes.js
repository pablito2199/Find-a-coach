import { createRouter, createWebHistory } from 'vue-router';

import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import store from './store/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { name: 'coaches', path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id', component: CoachDetail, props: true, children: [
                { path: 'contact', component: ContactCoach }
            ]
        },
        { name: 'requests', path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
        { name: 'register', path: '/register', component: CoachRegistration, meta: { requiresAuth: true } },
        { name: 'auth', path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
        { path: '/:notFound(.*)', component: NotFound }
    ]
});

router.beforeEach(function (to, _, next) {
    if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters['auth/isAuthenticated']) {
        next('/coaches');
    } else {
        next();
    }
});

export default router;