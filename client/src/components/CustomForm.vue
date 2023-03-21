<script setup lang="ts">
import PageBox from './PageBox.vue';
</script>

<template>
    <!-- Custom form component -->
    <form class="block">
        <PageBox>
            <slot></slot>
        </PageBox>
    </form>
</template>

<style scoped>

</style>