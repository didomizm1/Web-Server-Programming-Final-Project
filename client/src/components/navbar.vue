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
    <nav class="navbar is-primary">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href=""> 
                    <img src="./media/images/logos/sushifit-white-no-background.png" alt="SushiFit Logo" width="150">
                </a>
                <div class="navbar-burger" :class="{ 'is-active': isMenuActive }" @click="toggleMenu" >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        
            <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
                <div class="navbar-start">
                    <RouterLink to="/" class="navbar-item">Home</RouterLink>
                    <RouterLink to="/about" class="navbar-item">About</RouterLink>
                </div>
            
                <div class="navbar-end">
                    <LoginBadge />
                </div>
            </div>
            
        </div>
    </nav>
</template>

<style scoped>

</style>