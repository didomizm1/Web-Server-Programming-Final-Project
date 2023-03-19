<script setup lang="ts">

</script>

<template>
    <div class="file">
        <label class="file-label">
            <slot name="input"></slot>
            <span class="file-cta">
                <span class="file-icon">
                    <slot name="icon"></slot>
                </span>
                <span class="file-label">
                    <slot name="label"></slot>
                </span>
            </span>
        </label>
    </div>
</template>

<style scoped>

</style>