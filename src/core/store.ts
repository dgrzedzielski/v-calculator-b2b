import Vue from 'vue';
import Vuex from 'vuex';
import AuthModule, { AuthState } from '@/modules/auth/auth-store';

Vue.use(Vuex);

export interface StoreState {
    auth: AuthState;
}

export default new Vuex.Store<StoreState>({
    modules: {
        auth: AuthModule,
    },
});
