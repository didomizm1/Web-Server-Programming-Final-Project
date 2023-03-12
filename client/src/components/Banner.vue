<script setup lang="ts">

</script>

<template>
    <section class="hero has-background-danger-dark my-6">
        <div class="hero-body">
            <div class="container has-text-centered">
                <p class="title">
                    <slot name="title"></slot>
                </p>
                <p class="subtitle">
                    <slot name="subtitle"></slot>
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped>
.title {
    font-family: 'SF Wasabi', sans-serif;
    font-size: 3rem;
}
.subtitle {
    font-family: 'Japanese Brush', sans-serif;
    font-size: 1.5rem;
}
</style>