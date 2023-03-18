<script setup lang="ts">
import { useSession, useLogout } from '../model/session';

const session = useSession(); // Reactive session object
const logout = useLogout(); // Lagout function
</script>

<template>
    <!-- Holds links to pages which relate to login status, registration, and accounts -->

    <!-- Only shown if user is logged in -->
    <template v-if="session.user">
        <div class="navbar-item">
            Welcome, {{ session.user.username }}!
        </div>

        <RouterLink class="navbar-item" to="/profile">
            <span class="icon">
                <i class="fas fa-user-gear"></i>
            </span>
            <strong>Profile</strong>
        </RouterLink>

        <a class="navbar-item" @click="logout()">
            <span class="icon">
                <i class="fas fa-door-open"></i>
            </span>
            <strong>Log Out</strong>
        </a>

    </template>

    <!-- Only shown if user is logged out -->
    <template v-else>
        <RouterLink class="navbar-item" to="/login">
            <span class="icon">
                <i class="fas fa-user"></i>
            </span>
            <strong>Log In</strong>
        </RouterLink>
        
        <RouterLink class="navbar-item" to="/register">
            <span class="icon">
                <i class="fas fa-user-plus"></i>
            </span>
            <strong>Sign Up</strong>
        </RouterLink>

    </template>

</template>

<style scoped>

</style>