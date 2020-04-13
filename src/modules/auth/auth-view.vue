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
    import { defineComponent } from '@vue/composition-api';

    const AuthView = defineComponent({});

    export default AuthView;
</script>
