<script setup lang="ts">

</script>

<template>
    <div class="container form">
        <div class="box">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.form, .box {
    width: 60vw;
    min-width: max-content;
}
</style>