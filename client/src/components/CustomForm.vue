<script setup lang="ts">
import CustomBox from './CustomBox.vue';
</script>

<template>
    <!-- Custom form component -->
    <div class="form">
        <CustomBox>
            <slot></slot>
        </CustomBox>
    </div>
</template>

<style scoped>

</style>