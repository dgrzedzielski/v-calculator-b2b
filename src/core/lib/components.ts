import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import Toast from 'vue-toastification';
import BaseButton from '@/core/components/buttons/base-button';
import BaseLoader from '@/core/components/ui/base-loader';
import ButtonWithLoader from '@/core/components/buttons/button-with-loader.vue';
import InputFormGroup from '@/core/components/forms/input-form-group.vue';
import BaseLink from '@/core/components/ui/base-link';

Vue.use(VueCompositionApi);
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
