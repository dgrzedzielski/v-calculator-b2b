import Vue from 'vue';
import BaseButton from '@/core/components/ui/base-button.vue';
import Toast from 'vue-toastification';

// @ts-ignore
Vue.use(Toast, {
    draggablePercent: 0.45,
    maxToasts: 10
});
Vue.component('base-button', BaseButton);
