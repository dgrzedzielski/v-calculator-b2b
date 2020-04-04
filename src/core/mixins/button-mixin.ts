import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
class ButtonMixin extends Vue {
    @Prop({ default: false, type: Boolean }) primary!: boolean;
    @Prop({ default: false, type: Boolean }) success!: boolean;
    @Prop({ default: false, type: Boolean }) danger!: boolean;
    @Prop({ default: false, type: Boolean }) outline!: boolean;
    @Prop({ default: false, type: Boolean }) small!: boolean;
    @Prop({ default: false, type: Boolean }) large!: boolean;
    @Prop({ default: false, type: Boolean }) disabled!: boolean;
}

export default ButtonMixin;
