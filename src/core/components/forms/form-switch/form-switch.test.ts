import FormSwitch from '.';
import { shallowMount } from '@/core/utils/test-utils';
import { Wrapper } from '@vue/test-utils';

describe('FormSwitch component', () => {
    let wrapper: Wrapper<FormSwitch>;

    beforeEach(() => {
        wrapper = shallowMount<FormSwitch>(FormSwitch, {
            propsData: {
                name: 'test-switch',
                label: 'label',
                value: false
            }
        });
    });

    it('should renders without crash', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should emit input with changed value on click', () => {
        wrapper.find('label').trigger('click');
        expect(wrapper.emitted('input')![0][0]).toBe(true);
    });
});
