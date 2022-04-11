import { INSURANCE_OPTIONS } from '../types/insurance-options';
import { TAX_FORM_OPTIONS } from '../types/tax-form-options';

export const useTaxOptions = () => {
    return {
        taxFormOptions: TAX_FORM_OPTIONS,
        insuranceOptions: INSURANCE_OPTIONS,
    };
};
