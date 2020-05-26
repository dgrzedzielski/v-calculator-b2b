import { auth } from '@/core/lib/firebase';

const AuthService = {
    login: async (email: string, password: string) => {
        await auth.signInWithEmailAndPassword(email, password);
    },
    register: async (email: string, password: string) => {
        await auth.createUserWithEmailAndPassword(email, password);
    },
    logout: async () => {
        await auth.signOut();
    },
};

export default AuthService;
