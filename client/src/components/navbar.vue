<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import LoginBadge from './LoginBadge.vue';

const isMenuActive = ref(false);

function toggleMenu() {
    isMenuActive.value = !isMenuActive.value;
    console.log({ isMenuActive })
}

</script>

<template>
    <nav class="navbar is-danger py-5">
        <div class="navbar-brand">
            <RouterLink to="/home" class="navbar-item">
                <img src="@/assets/logos/sushifit-white-no-background.png" alt="SushiFit Logo" width="150">
            </RouterLink>

            <div class="navbar-burger" :class="{ 'is-active': isMenuActive }" @click="toggleMenu" >
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>
    
        <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
            <div class="navbar-start">
                <RouterLink to="/home" class="navbar-item">
                    <span class="icon">
                        <i class="fas fa-home"></i>
                    </span>
                    <strong>Home</strong>
                </RouterLink>
                <RouterLink to="/about" class="navbar-item">
                    <span class="icon">
                        <i class="fas fa-book"></i>
                    </span>
                    <strong>About</strong>
                </RouterLink>
                <RouterLink to="/faqs" class="navbar-item">
                    <span class="icon">
                        <i class="fas fa-list"></i>
                    </span>
                    <strong>FAQs</strong>
                </RouterLink>
            </div>
        
            <div class="navbar-end">
                <LoginBadge />
            </div>
            
        </div>

    </nav>
</template>

<style scoped>

</style>