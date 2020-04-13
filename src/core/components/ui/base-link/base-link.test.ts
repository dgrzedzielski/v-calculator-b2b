import BaseLink from '.';
import { Wrapper } from '@vue/test-utils';
import { shallowMount } from '@/core/utils/test-utils';

describe('BaseLink component', () => {
    let wrapper: Wrapper<Vue>;

    beforeEach(() => {
        wrapper = shallowMount(BaseLink, {
            propsData: {
                to: '/'
            },
            stubs: ['router-link']
        });
    });

    it('should renders without crash', () => {
        expect(wrapper.exists()).toBeTruthy();
    });
});
