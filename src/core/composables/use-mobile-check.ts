import { ref, onMounted, onBeforeUnmount } from '@vue/composition-api';

export const useMobileCheck = () => {
    const isMobileMq = window.matchMedia('screen and (max-width: 991px)');
    const isMobile = ref<boolean>(isMobileMq.matches);

    const checkMq = (query: MediaQueryListEvent) => {
        if (query.matches) {
            isMobile.value = true;
        } else {
            isMobile.value = false;
        }
    };

    onMounted(() => {
        isMobileMq.addListener(checkMq);
    });

    onBeforeUnmount(() => {
        isMobileMq.removeListener(checkMq);
    });

    return { isMobile };
};
