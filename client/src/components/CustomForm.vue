<script setup lang="ts">
import CustomBox from './CustomBox.vue';
</script>

<template>
    <div class="container form">
        <CustomBox>
            <slot></slot>
        </CustomBox>
    </div>
</template>

<style scoped>
.form {
    width: 60vw;
    min-width: max-content;
}
</style>