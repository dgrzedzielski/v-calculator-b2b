import { Component, Vue } from 'vue-property-decorator';
import { INSURANCE_OPTIONS } from '@/modules/calculator/types/insurance-options';
import { TAX_FORM_OPTIONS } from '@/modules/calculator/types/tax-form-options';

@Component
class CalculatorOptionsMixin extends Vue {
    get insuranceOptions() {
        return INSURANCE_OPTIONS;
    }

    get taxFormOptions() {
        return TAX_FORM_OPTIONS;
    }
}

export default CalculatorOptionsMixin;
