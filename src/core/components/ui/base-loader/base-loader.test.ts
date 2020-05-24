import BaseLoader from '.';
import { Wrapper } from '@vue/test-utils';
import { shallowMount } from '@/core/utils/test-utils';

describe('BaseLoader component', () => {
    let wrapper: Wrapper<Vue>;

    beforeEach(() => {
        wrapper = shallowMount(BaseLoader);
    });

    it('should renders without crash', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should has proper aria-title', () => {
        expect(wrapper.attributes('aria-label')).toBe('Ładowanie...');
    });

    it('should has proper classes and default should be primary themed', () => {
        ['loader', 'loader--primary'].forEach((loaderClass) => {
            expect(wrapper.classes()).toContain(loaderClass);
        });
    });
});
