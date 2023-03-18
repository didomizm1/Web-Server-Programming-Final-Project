<script setup lang="ts">
import PageBox from './PageBox.vue';
</script>

<template>
    <!-- Custom form component -->
    <div class="form block">
        <PageBox>
            <slot></slot>
        </PageBox>
    </div>
</template>

<style scoped>

</style>