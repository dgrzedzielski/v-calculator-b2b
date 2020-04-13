import { defineComponent } from '@vue/composition-api';

export interface BaseFormGroupProps {
    name: string;
    label: string;
}

const BaseFormGroupMixin = defineComponent<BaseFormGroupProps>({
    props: {
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        }
    }
});

export default BaseFormGroupMixin;
