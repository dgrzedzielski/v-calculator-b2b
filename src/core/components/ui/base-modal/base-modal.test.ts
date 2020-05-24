import BaseModal from '.';
import { Wrapper } from '@vue/test-utils';
import { shallowMount } from '@/core/utils/test-utils';

describe('BaseModal component', () => {
    let wrapper: Wrapper<Vue>;

    beforeEach(() => {
        wrapper = shallowMount(BaseModal, {
            propsData: {
                name: 'name',
            },
            attachToDocument: true,
            slots: {
                default: {
                    template: `
                    <div>
                        <input id="modal-input" type="text">
                        <button id="modal-button">button</button>
                    </div>
                    `,
                },
            },
            stubs: ['v-icon'],
        });
    });

    it('should renders without crash', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should emit close event on click on overlay', () => {
        wrapper.find('.modal__overlay').trigger('click');
        expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('should emit close event on click on close button', () => {
        wrapper.find('.modal__close').trigger('click');
        expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('should emit close event on esc key', () => {
        wrapper.find('.modal').trigger('keydown.esc');
        expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('should focus first focusable element on mount', () => {
        expect(document.activeElement!.id).toBe('modal-input');
    });
});
