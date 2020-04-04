<template>
    <div
        class="app"
    >
        <router-view v-if="isAuthReady" />
        <base-loader v-else />
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';

    @Component
    export default class App extends Vue {
        get isAuthReady() {
            return this.$store.state.auth.isReady;
        }
    };
</script>

<style lang="scss">
    @import '../../scss/styles';
</style>
