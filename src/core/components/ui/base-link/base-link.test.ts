import BaseLink from '.';
import { Wrapper } from '@vue/test-utils';
import { shallowMount } from '@/core/utils/test-utils';

describe('BaseLink component', () => {
    let wrapper: Wrapper<BaseLink>;

    beforeEach(() => {
        wrapper = shallowMount<BaseLink>(BaseLink, {
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
