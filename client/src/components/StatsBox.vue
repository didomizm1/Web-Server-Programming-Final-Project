<script setup lang="ts">

</script>

<template>
    <div class="container">
        <div class="box has-background-warning-light">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin-left: 15rem;
    margin-right: 15rem;
    min-width: fit-content;
}
.box {
    outline: solid 5px;
}
</style>