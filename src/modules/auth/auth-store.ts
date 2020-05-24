import Vue from 'vue';
import { User } from '@/modules/auth/types/user';
import { computed } from '@vue/composition-api';

export interface AuthState {
    user: User | null;
    isReady: boolean;
}

const state = Vue.observable<AuthState>({
    user: null,
    isReady: false,
});

export const useAuthStore = () => {
    const user = computed(() => state.user);
    const isReady = computed(() => state.isReady);
    const isUserLogged = computed(() => state.user !== null);

    const setUser = (user: User | null) => {
        state.user = user;
    };

    const setAsReady = () => {
        state.isReady = true;
    };

    return {
        user,
        isReady,
        isUserLogged,
        setUser,
        setAsReady,
    };
};
