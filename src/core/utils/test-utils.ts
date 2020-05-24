import VueCompositionApi from '@vue/composition-api';
import {
    VueClass,
    ThisTypedShallowMountOptions,
    Wrapper,
    createLocalVue,
    shallowMount as defaultShallowMount,
    mount as defaultMount,
} from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(VueCompositionApi);

export const shallowMount = <V extends Vue>(
    component: VueClass<V>,
    options: ThisTypedShallowMountOptions<V> = {}
): Wrapper<V> => {
    return defaultShallowMount(component, { localVue, ...options });
};

export const mount = <V extends Vue>(
    component: VueClass<V>,
    options: ThisTypedShallowMountOptions<V> = {}
): Wrapper<V> => {
    return defaultMount(component, { localVue, ...options });
};

export const setProps = async <V extends Vue>(
    wrapper: Wrapper<V>,
    props: { [key: string]: unknown }
) => {
    wrapper.setProps(props);
    await wrapper.vm.$nextTick();
};
