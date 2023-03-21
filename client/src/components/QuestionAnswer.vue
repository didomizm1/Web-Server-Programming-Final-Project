<script setup lang="ts">

</script>

<template>
    <!-- A header and paragraph pair for various usage cases, most notably for the FAQ page -->
    <div class="section">
        <h1>
            <slot name="q"></slot>
        </h1>
        <p>
            <slot name="a"></slot>
        </p>
    </div>
</template>

<style scoped>
p {
    font-size: 1.15rem;
    line-height: 3;
}
</style>