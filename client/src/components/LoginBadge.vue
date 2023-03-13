<script setup lang="ts">

</script>

<template>
    <!-- Holds button links to pages related to logging in and registering -->
    <RouterLink to="/login" class="navbar-item">
        <span class="icon">
            <i class="fas fa-user"></i>
        </span>
        <strong>Log In</strong>
    </RouterLink>
    
    <RouterLink to="/register" class="navbar-item">
        <span class="icon">
            <i class="fas fa-user-plus"></i>
        </span>
        <strong>Sign Up</strong>
    </RouterLink>
    
</template>

<style scoped>

</style>