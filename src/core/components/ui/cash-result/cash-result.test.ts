import CashResult from '.';
import { Wrapper } from '@vue/test-utils';
import { shallowMount, setProps } from '@/core/utils/test-utils';

describe('CashResult component', () => {
    let wrapper: Wrapper<CashResult>;

    beforeEach(() => {
        wrapper = shallowMount<CashResult>(CashResult, {
            propsData: {
                theme: 'primary',
                value: 5000,
                label: 'label'
            },
            filters: {
                currency: (val: any) => val
            },
            stubs: ['v-icon']
        });
    });

    it('should renders without crash', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should has proper classes', async () => {
        ['cash-result', 'cash-result--primary'].forEach(wrapperClass => {
            expect(wrapper.classes()).toContain(wrapperClass);
        });

        await setProps(wrapper, {
            icon: 'test',
            theme: 'success'
        });

        ['cash-result', 'cash-result--success', 'cash-result--with-icon'].forEach(wrapperClass => {
            expect(wrapper.classes()).toContain(wrapperClass);
        });
    });

    it('shold has indicator if icon prop is not provided', () => {
        expect(wrapper.find('.cash-result__indicator').exists()).toBeTruthy();
    });
});
