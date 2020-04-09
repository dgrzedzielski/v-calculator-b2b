import { Themable } from '@/core/components/ui/ui-theme';

export type ButtonSize = 'small' | 'large';

export interface BaseButtonProps extends Themable {
    disabled: boolean;
    outline: boolean,
    size?: ButtonSize;
}
