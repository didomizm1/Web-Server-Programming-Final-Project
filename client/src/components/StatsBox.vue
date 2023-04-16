<script setup lang="ts">
import CustomLevel from './CustomLevel.vue';
</script>

<template>
    <!-- Container for statistics about a single day of exercises -->
        <div class="box has-background-warning-light">
            <CustomLevel>
                <slot name="date"></slot>
            </CustomLevel>
            <CustomLevel>
                <slot name="distance"></slot>
            </CustomLevel>
            <CustomLevel>
                <slot name="duration"></slot>
            </CustomLevel>
            <CustomLevel>
                <slot name="pace"></slot>
            </CustomLevel>
            <CustomLevel>
                <slot name="calories"></slot>
            </CustomLevel>
        </div>
</template>

<style scoped>
.box {
    outline: solid 5px;
    margin-bottom: 5rem;
}
</style>