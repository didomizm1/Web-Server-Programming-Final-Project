<script setup lang="ts">

</script>

<template>
    <div class="container">
        <div class="box has-background-info-light">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 60vw;
    min-width: max-content;
}
</style>