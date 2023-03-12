<script setup lang="ts">

</script>

<template>
    <section class="hero has-background-danger-dark my-6">
        <div class="hero-body">
            <div class="container has-text-centered">
                <p class="title">
                    <slot></slot>
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
</style>