import Vue from 'vue';
import App from '@/core/app.vue';
import router from '@/core/lib/router';
import '@/core/lib/components';
import '@/core/lib/icons';
import '@/core/lib/filters';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
