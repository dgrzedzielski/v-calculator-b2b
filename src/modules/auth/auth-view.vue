<template>
    <div class="view view--centered">
        <router-view />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api';

    const AuthView = defineComponent({});

    export default AuthView;
</script>
