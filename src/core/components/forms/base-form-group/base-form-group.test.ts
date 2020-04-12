import BaseFormGroup from '.';
import { Wrapper } from '@vue/test-utils';
import { shallowMount } from '@/core/utils/test-utils';

describe('BaseFormGroup component', () => {
    let wrapper: Wrapper<BaseFormGroup>;

    beforeEach(() => {
        wrapper = shallowMount<BaseFormGroup>(BaseFormGroup, {
            propsData: {
                name: 'name',
                label: 'label'
            }
        });
    });

    it('should renders without crash', () => {
        expect(wrapper.exists()).toBeTruthy();
    });
});
