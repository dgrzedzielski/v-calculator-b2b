import Vue from 'vue';
import Vuex from 'vuex';
import AuthModule from '@/modules/auth/auth-store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth: AuthModule
    }
});
