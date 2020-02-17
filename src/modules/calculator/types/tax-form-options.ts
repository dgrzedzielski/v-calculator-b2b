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

export interface ProgressiveTaxFormOption extends TaxFormOption {
    id: TaxForm.PROGRESSIVE;
    rateOverThreshold: number;
    threshold: number;
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
        rateOverThreshold: PROGRESSIVE_TAX_RATE_OVER_THRESHOLD,
        threshold: PROGRESSIVE_TAX_THRESHOLD,
        label: 'Progresywna<br>17% / 32%'
    } as ProgressiveTaxFormOption
];
