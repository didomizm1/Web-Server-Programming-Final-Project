<script setup lang="ts">

</script>

<template>
    <!-- Holds text for a quote -->
    <div class="container">
        <p class="title"><b><i>"<slot name="text"></slot>"</i></b></p>
        <p class="heading">-<slot name="person"></slot></p>
    </div>
</template>

<style scoped>
.container {
    margin-bottom: 15vh;
    margin-left: 12.5vw;
    margin-right: 12.5vw;
}
.title {
    font-size: max(2vw, 1.5rem);
}
.heading {
    font-size: large;
}
</style>