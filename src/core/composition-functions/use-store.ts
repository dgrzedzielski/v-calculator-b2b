import { inject, provide } from '@vue/composition-api';
import { Store } from 'vuex';
import { StoreState } from '../store';

// eslint-disable-next-line symbol-description
const StoreSymbol = Symbol();

export const provideStore = (store: Store<StoreState>) => {
    provide(StoreSymbol, store);
};

export const useStore = (): Store<StoreState> => {
    const store: Store<StoreState> | void = inject(StoreSymbol);

    if (!store) {
        throw new Error('Store not provided');
    }

    return store;
};
