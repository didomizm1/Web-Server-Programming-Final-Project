<script setup lang="ts">

</script>

<template>
    <!-- Colored box to contain other components on a page -->
    <div class="container">
        <div class="box has-background-info-light">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin-left: 3rem;
    margin-right: 3rem;
    margin-bottom: 3rem;
    min-width: fit-content;
}
</style>