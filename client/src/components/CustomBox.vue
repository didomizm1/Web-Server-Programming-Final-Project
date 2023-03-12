<script setup lang="ts">

</script>

<template>
    <!-- Colored box to contain other components -->
    <div class="container">
        <div class="box has-background-info-light">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 60vw;
}
</style>