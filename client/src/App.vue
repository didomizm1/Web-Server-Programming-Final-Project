<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar />

  <div class="columns is-centered is-gapless">

    <div class="column has-background-danger-light">
      
    </div> 

    <div class="column is-8">
      <section class="hero has-background-white is-fullheight">
        <RouterView />
      </section>
    </div>

    <div class="column has-background-danger-light">
      
    </div>

  </div>
    
  
  
</template>

<style scoped>
  
</style>
