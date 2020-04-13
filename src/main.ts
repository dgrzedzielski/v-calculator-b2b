import 'focus-visible';
import Vue from 'vue';
import App from '@/core/app.vue';
import router from '@/core/lib/router';
import '@/core/lib/components';
import '@/core/lib/icons';
import '@/core/lib/filters';
import './registerServiceWorker';
import store from '@/core/store';
import { auth } from '@/core/lib/firebase';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    created() {
        auth.onAuthStateChanged((user) => {
            store.dispatch('auth/init', user);
        });
    },
    render: h => h(App)
}).$mount('#app');
