<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { useSession } from '../model/session';
import LoginBadge from './LoginBadge.vue';
import NavLogo from './NavLogo.vue';

// Reactive session object
const session = useSession();

// Toggle navbar menu functionality for mobile devices
const isMenuActive = ref(false);

function toggleMenu() {
    isMenuActive.value = !isMenuActive.value;
    console.log({ isMenuActive });
}

// Toggle dropdown menu
const isDropdownActive = ref(false);

function toggleDropdown() {
    isDropdownActive.value = !isDropdownActive.value;
    console.log({ isDropdownActive });
}

</script>

<template>
    <nav class="navbar is-danger">
        <!-- Logo and burger -->
        <div class="navbar-brand">
            <RouterLink class="navbar-item" to="/">
                <NavLogo />
            </RouterLink>

            <div class="navbar-burger" :class="{ 'is-active': isMenuActive }" @click="toggleMenu()">
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>

        <!-- Links -->
        <div class="navbar-menu" :class="{ 'is-active': isMenuActive }">
            <div class="navbar-start">
                <RouterLink class="navbar-item" to="/">
                    <span class="icon">
                        <i class="fas fa-home"></i>
                    </span>
                    <strong>Home</strong>
                </RouterLink>

                <!-- Links only available to logged in users -->
                <template v-if="session.user">

                    <div class="navbar-item has-dropdown" :class="{ 'is-active': isDropdownActive }" @click="toggleDropdown()">
                        <a class="navbar-link">
                            <span class="icon">
                                <i class="fas fa-person-running"></i>
                            </span>
                            <strong>My Activity</strong>
                        </a>

                        <div class="navbar-dropdown">
                            <RouterLink class="navbar-item" to="/exercises">
                                <span class="icon">
                                    <i class="fas fa-person-skating"></i>
                                </span>
                                <strong>Exercises</strong>
                            </RouterLink>
                            <RouterLink class="navbar-item mt-2" to="/meals">
                                <span class="icon">
                                    <i class="fas fa-bowl-rice"></i>
                                </span>
                                <strong>Meals</strong>
                            </RouterLink>
                            <RouterLink class="navbar-item mt-2 mb-1" to="/statistics">
                                <span class="icon">
                                    <i class="fas fa-chart-column"></i>
                                </span>
                                <strong>Statistics</strong>
                            </RouterLink>
                        </div>

                    </div>

                    <RouterLink class="navbar-item" to="/friends">
                        <span class="icon">
                            <i class="fas fa-users"></i>
                        </span>
                        <strong>Friends</strong>
                    </RouterLink>
                    
                </template>

                <RouterLink class="navbar-item" to="/user-search">
                    <span class="icon">
                        <i class="fas fa-search"></i>
                    </span>
                    <strong>User Search</strong>
                </RouterLink>

            </div>
            
            <div class="py-6"></div> <!-- Empty div used only for navbar spacing purposes with Bulma -->

            <div class="navbar-end">
                <LoginBadge />
            </div>
            
        </div>

    </nav>
</template>

<style scoped>

</style>