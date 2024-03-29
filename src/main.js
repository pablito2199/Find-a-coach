import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiGithub, BiLinkedin } from "oh-vue-icons/icons";
import { createApp } from 'vue';

import App from './App.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import router from './routes.js';
import store from './store/index.js';

addIcons(BiGithub, BiLinkedin);

const app = createApp(App);

app.use(router);
app.use(store);

app.component("v-icon", OhVueIcon);
app.component('base-badge', BaseBadge);
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-dialog', BaseDialog);
app.component('base-spinner', BaseSpinner);

app.mount('#app');
