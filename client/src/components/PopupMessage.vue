<script setup lang="ts">
import { ref } from 'vue';

// Functionality to hide menu when the close button is pressed
const closeButtonClicked = ref(false);

function hideMenu() {
    closeButtonClicked.value = true;
    console.log({ closeButtonClicked });
}

</script>

<template>
    <!-- Message which can be used as a closeable popup on pages -->
    <div class="container block mb-6" :class="{ 'is-hidden': closeButtonClicked }">
        <article class="message is-danger">
            <div class="message-header">
                <p>
                    <slot name="header"></slot>
                </p>
                <button class="delete" aria-label="delete" @click="hideMenu"></button>
            </div>
            <div class="message-body">
                <slot name="body"></slot>
            </div>
        </article>
    </div>
</template>

<style scoped>
.container {
    width: 34rem;
    max-width: 65vw;
}
</style>