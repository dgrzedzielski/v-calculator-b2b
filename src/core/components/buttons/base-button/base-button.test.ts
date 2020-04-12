import BaseButton from '.';
import { Wrapper } from '@vue/test-utils';
import { shallowMount, setProps } from '@/core/utils/test-utils';

const BTN_CONTENT = 'Test';

describe('BaseButton component', () => {
    let wrapper: Wrapper<BaseButton>;

    beforeEach(() => {
        wrapper = shallowMount<BaseButton>(BaseButton, {
            propsData: {
                theme: 'primary'
            },
            slots: {
                default: BTN_CONTENT
            }
        });
    });

    it('renders without crash', () => {
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.is('button')).toBeTruthy();
    });

    it('has proper content', () => {
        expect(wrapper.text()).toBe(BTN_CONTENT);
    });

    it('should has proper classes', async () => {
        ['btn', 'btn--primary'].forEach(wrapperClass => {
            expect(wrapper.classes(wrapperClass));
        });

        await setProps(wrapper, {
            theme: 'success',
            outline: true,
            size: 'large'
        });

        ['btn', 'btn--success', 'btn--large', 'btn--outline'].forEach(wrapperClass => {
            expect(wrapper.classes()).toContain(wrapperClass);
        });
    });

    it('should emit click event on click if not disabled', () => {
        wrapper.trigger('click');
        expect(wrapper.emitted('click')).toBeTruthy();
    });

    it('should not emit click event if button is disabled', async () => {
        await setProps(wrapper, {
            theme: 'primary',
            disabled: true
        });
        wrapper.trigger('click');
        expect(wrapper.emitted('click')).toBeFalsy();
    });
});
