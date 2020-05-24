import 'focus-visible';
import Vue from 'vue';
import App from '@/core/app.vue';
import router from '@/core/lib/router';
import '@/core/lib/components';
import '@/core/lib/icons';
import '@/core/lib/filters';
import './registerServiceWorker';
import { auth } from '@/core/lib/firebase';
import { useAuthStore } from '@/modules/auth/auth-store';

Vue.config.productionTip = false;

new Vue({
    router,
    created() {
        auth.onAuthStateChanged((user) => {
            const { setAsReady, setUser } = useAuthStore();
            // @ts-ignore
            setUser(user);
            setAsReady();
        });
    },
    render: (h) => h(App),
}).$mount('#app');
