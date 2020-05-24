import { defineComponent } from '@vue/composition-api';
import { ThemeVariant } from '@/core/components/ui/ui-theme';
import {
    BaseButtonProps,
    ButtonSize,
} from '@/core/components/buttons/button-types';

const ButtonMixin = defineComponent<BaseButtonProps>({
    props: {
        outline: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        theme: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            default: null,
        },
    },
});

export default ButtonMixin;
