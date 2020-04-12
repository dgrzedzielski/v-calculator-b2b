import FloatingButton from '.';
import { Wrapper } from '@vue/test-utils';
import { shallowMount } from '@/core/utils/test-utils';

describe('FloatingButton component', () => {
    let wrapper: Wrapper<FloatingButton>;

    beforeEach(() => {
        wrapper = shallowMount<FloatingButton>(FloatingButton);
    });

    it('should render without crash', () => {
        expect(wrapper.exists()).toBeTruthy();
    });
});
