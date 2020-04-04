import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import User from '@/modules/auth/types/user';

@Module({ namespaced: true })
class AuthModule extends VuexModule {
    user: User | null = null;
    isReady: boolean = false;

    get isUserLogged(): boolean {
        return this.user !== null;
    }

    @Mutation
    setUser(user: User | null) {
        this.user = user;
    }

    @Mutation
    setAuthAsReady() {
        this.isReady = true;
    }

    @Action
    init(user: User | null) {
        this.context.commit('setUser', user);
        this.context.commit('setAuthAsReady');
    }
}

export default AuthModule;
