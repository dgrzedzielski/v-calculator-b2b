import InputFormGroup from '.';
import { Wrapper } from '@vue/test-utils';
import { shallowMount } from '@/core/utils/test-utils';

describe('InputFormGroup component', () => {
    let wrapper: Wrapper<Vue>;

    beforeEach(() => {
        wrapper = shallowMount(InputFormGroup, {
            propsData: {
                label: 'label',
                value: 'test-value',
                name: 'test-input',
            },
            stubs: ['base-form-group'],
        });
    });

    it('should render without crash', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should emit input event on type', () => {
        const input = wrapper.find('input');
        input.setValue('new-value');
        expect(input.trigger('input'));
        expect(wrapper.emitted('input')![0][0]).toBe('new-value');
    });
});
