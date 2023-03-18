<script setup lang="ts">
import NavLogo from './NavLogo.vue';
</script>

<template>
    <!-- Footer on the bottom of the page with links and information -->
    <footer class="footer has-background-black-ter">
        <nav class="level">
            <RouterLink class="level-item" to="/">
                <NavLogo />
            </RouterLink>

            <RouterLink class="level-item has-text-grey-lighter mt-5" to="/">
                <span class="icon">
                    <i class="fas fa-home"></i>
                </span>
                <strong>Home</strong>
            </RouterLink>
            <RouterLink class="level-item has-text-grey-lighter mt-5" to="/about">
                <span class="icon">
                    <i class="fas fa-book"></i>
                </span>
                <strong>About</strong>
            </RouterLink>
            <RouterLink class="level-item has-text-grey-lighter mt-5" to="/faqs">
                <span class="icon">
                    <i class="fas fa-list"></i>
                </span>
                <strong>FAQs</strong>
            </RouterLink>

        </nav>
    </footer>
</template>

<style scoped>
.footer {
    padding-top: 6rem;
    padding-bottom: 6rem;
}
</style>