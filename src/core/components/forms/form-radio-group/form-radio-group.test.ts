import FormRadioGroup from '.';
import { Wrapper } from '@vue/test-utils';
import { shallowMount, setProps } from '@/core/utils/test-utils';

describe('FormRadioGroup component', () => {
    let wrapper: Wrapper<Vue>;
    const options = [
        { label: 'A', value: 0 },
        { label: 'B', value: 1 },
        { label: 'C', value: 2 },
        { label: 'D', value: 3 },
    ];

    beforeEach(() => {
        wrapper = shallowMount(FormRadioGroup, {
            propsData: {
                label: 'label',
                name: 'name',
                value: 1,
                optionValueKey: 'value',
                options,
            },
        });
    });

    it('renders without crash', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should render proper options count', () => {
        expect(wrapper.findAll('.form-radio-group__option').length).toBe(4);
    });

    it('should has checked proper option', async () => {
        expect(wrapper.find('.form-radio-group__option--checked').text()).toBe(
            'B'
        );

        const newOptionIndex = 3;
        await setProps(wrapper, {
            value: options[newOptionIndex].value,
        });

        expect(wrapper.find('.form-radio-group__option--checked').text()).toBe(
            options[newOptionIndex].label
        );
    });

    it('should emit input event on click on option', () => {
        const optionIndex = 0;
        const firstOptionLabel = wrapper.findAll('label').at(optionIndex);
        firstOptionLabel.trigger('click');
        expect(wrapper.emitted('input')![0][0]).toBe(
            options[optionIndex].value
        );
    });
});
