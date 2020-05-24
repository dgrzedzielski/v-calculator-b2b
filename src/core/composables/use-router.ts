import VueRouter from 'vue-router';
import { inject, provide } from '@vue/composition-api';

// eslint-disable-next-line symbol-description
const RouterSymbol = Symbol();

export const provideRouter = (router: VueRouter) => {
    provide(RouterSymbol, router);
};

export const useRouter = (): VueRouter => {
    const router: VueRouter | void = inject(RouterSymbol);

    if (!router) {
        throw new Error('router not provided');
    }

    return router;
};
