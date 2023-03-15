<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import FooterNav from './components/FooterNav.vue';
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
  background-image: url("./assets/backgrounds/wood_texture.jpg");
}
</style>
