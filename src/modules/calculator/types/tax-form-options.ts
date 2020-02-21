import {
    LINEAR_TAX_RATE,
    PROGRESSIVE_TAX_RATE_BASE,
    PROGRESSIVE_TAX_RATE_OVER_THRESHOLD, PROGRESSIVE_TAX_THRESHOLD
} from '@/modules/calculator/logic/tax-rates';

export enum TaxForm {
    LINEAR,
    PROGRESSIVE
}

export interface TaxFormOption {
    id: TaxForm;
    baseRate: number;
    label: string;
}

export const TAX_FORM_OPTIONS: TaxFormOption[] = [
    {
        id: TaxForm.LINEAR,
        baseRate: LINEAR_TAX_RATE,
        label: 'Liniowa<br>19%'
    },
    {
        id: TaxForm.PROGRESSIVE,
        baseRate: PROGRESSIVE_TAX_RATE_BASE,
        label: 'Progresywna<br>17% / 32%'
    }
];
