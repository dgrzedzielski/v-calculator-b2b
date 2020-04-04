import Vue from 'vue';
import Toast from 'vue-toastification';
import BaseButton from '@/core/components/ui/base-button.vue';
import BaseLoader from '@/core/components/ui/base-loader.vue';
import ButtonWithLoader from '@/core/components/ui/button-with-loader.vue';
import InputFormGroup from '@/core/components/forms/input-form-group.vue';
import BaseLink from '@/core/components/ui/base-link.vue';

// @ts-ignore
Vue.use(Toast, {
    draggablePercent: 0.45,
    maxToasts: 10
});
Vue.component('base-button', BaseButton);
Vue.component('base-loader', BaseLoader);
Vue.component('base-link', BaseLink);
Vue.component('button-with-loader', ButtonWithLoader);
Vue.component('input-form-group', InputFormGroup);
