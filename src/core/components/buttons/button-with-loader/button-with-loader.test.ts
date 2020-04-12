import ButtonWithLoader from '.';
import { Wrapper } from '@vue/test-utils';
import { shallowMount, setProps } from '@/core/utils/test-utils';

const BTN_CONTENT = 'Test';

describe('ButtonWithLoader component', () => {
    let wrapper: Wrapper<ButtonWithLoader>;

    beforeEach(() => {
        wrapper = shallowMount<ButtonWithLoader>(ButtonWithLoader, {
            propsData: {
                loading: false,
                theme: 'primary'
            },
            slots: {
                default: BTN_CONTENT
            },
            listeners: {
                click: () => {}
            },
            stubs: ['base-button', 'base-loader']
        });
    });

    it('should render without crash', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should render loader if loading prop is true', async () => {
        await setProps(wrapper, { loading: true });
        expect(wrapper.find('.btn__loader').exists()).toBeTruthy();
        expect(wrapper.classes()).toContain('btn--loading');
    });

    it('should render only content if loading prop is false', () => {
        expect(wrapper.find('.btn__loader').exists()).toBeFalsy();
        expect(wrapper.classes()).not.toContain('btn--loading');
        expect(wrapper.text()).toEqual(BTN_CONTENT);
    });
});
