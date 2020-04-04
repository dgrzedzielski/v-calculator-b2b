<template>
    <div class="view view--centered">
        <transition
            mode="out-in"
            name="fade-slide-x"
        >
            <router-view :key="$route.fullPath" />
        </transition>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';

    @Component
    export default class AuthView extends Vue {};
</script>
