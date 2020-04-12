import ListMenu from '.';
import { Wrapper } from '@vue/test-utils';
import { shallowMount } from '@/core/utils/test-utils';

describe('ListMenu component', () => {
    let wrapper: Wrapper<Vue>;
    const onClick1 = jest.fn();
    const onClick2 = jest.fn();

    beforeEach(() => {
        wrapper = shallowMount(ListMenu, {
            propsData: {
                items: [
                    {
                        title: 'first',
                        onClick: onClick1
                    },
                    {
                        title: 'second',
                        onClick: onClick2
                    }
                ]
            }
        });
    });

    it('should renders without crash', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('shold render proper items count', () => {
        expect(wrapper.findAll('.list-menu__item').length).toBe(2);
    });

    it('sholud call onClick function when click on item', () => {
        wrapper.findAll('.list-menu__button').at(0).trigger('click');
        expect(onClick1).toBeCalled();

        wrapper.findAll('.list-menu__button').at(1).trigger('click');
        expect(onClick2).toBeCalled();
    });
});
