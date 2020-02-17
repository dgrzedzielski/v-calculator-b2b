import {
    ADDITIONAL_INSURANCE_COST,
    HEALTH_INSURANCE,
    OPTIONAL_SICKNESS_INSURANCE,
    OPTIONAL_SICKNESS_INSURANCE_LOWERED,
    SOCIAL_CONTRIBUTION,
    SOCIAL_CONTRIBUTION_LOWERED
} from '@/modules/calculator/logic/tax-rates';

export enum InsuranceVariant {
    START,
    LOWERED,
    FULL
}

export interface InsuranceOption {
    id: InsuranceVariant;
    value: {
        healthInsurance: number;
        optionalSicknessInsurance: number;
        socialContribution: number;
        additional?: number;
    };
    label: string;
}

export const INSURANCE_OPTIONS: InsuranceOption[] = [
    {
        id: InsuranceVariant.START,
        value: {
            healthInsurance: HEALTH_INSURANCE,
            optionalSicknessInsurance: 0,
            socialContribution: 0
        },
        label: 'Na start'
    },
    {
        id: InsuranceVariant.LOWERED,
        value: {
            healthInsurance: HEALTH_INSURANCE,
            optionalSicknessInsurance: OPTIONAL_SICKNESS_INSURANCE_LOWERED,
            socialContribution: SOCIAL_CONTRIBUTION_LOWERED
        },
        label: 'Obniżona'
    },
    {
        id: InsuranceVariant.FULL,
        value: {
            healthInsurance: HEALTH_INSURANCE,
            optionalSicknessInsurance: OPTIONAL_SICKNESS_INSURANCE,
            socialContribution: SOCIAL_CONTRIBUTION,
            additional: ADDITIONAL_INSURANCE_COST
        },
        label: 'Pełna'
    }
];
