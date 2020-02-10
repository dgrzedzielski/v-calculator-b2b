import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BaseFormGroupMixin extends Vue {
    @Prop({ required: true }) name!: string;
    @Prop({ required: true }) label!: string;
};
