<script setup lang="ts">
import { RouterView } from 'vue-router';
import { ref } from 'vue';
import { useLogin } from './model/session';
import Navbar from './components/Navbar.vue';
import FooterNav from './components/FooterNav.vue';

// Refs to hold information about a user's login information
const userEmail = ref<string>();
const userPassword = ref<string>();

// Login function
const login = useLogin(userEmail, userPassword);

// Session from localStorage
const storedEmail = localStorage.getItem('email');
const storedPassword = localStorage.getItem('password');

// Check for a logged in user on page reload
if (storedEmail && storedPassword) { 
  userEmail.value = storedEmail;
  userPassword.value = storedPassword;
  login();
}

</script>

<template>
  <!-- Navbar on the top of the page -->
  <Navbar />

  <!-- Columns of the page -->
  <div class="columns is-centered is-gapless mb-0">
    <div class="column side-column"></div> 

    <div class="column is-8">
      <section class="hero has-background-white is-fullheight">
        <RouterView />
      </section>
    </div>

    <div class="column side-column"></div>

  </div>

  <!-- Footer on the bottom of the page -->
  <FooterNav />
  
</template>

<style scoped>
.side-column {
  background-image: url("./assets/backgrounds/wood-texture.jpg");
}
</style>
