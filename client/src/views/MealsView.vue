<script setup lang="ts">
import PopupMessage from '../components/PopupMessage.vue';
import Banner from '../components/Banner.vue';

// Save current page
localStorage.setItem('currentPage', '/meals');

</script>

<template>
  <!-- Banner on the top of the page -->
  <Banner>
    <template #title>
      My Meals
    </template>
    <template #subtitle>
      Track your meals below!
    </template>
  </Banner>

  <!-- Work in Progress popup message -->
  <PopupMessage>
    <template #header>Work in Progress!</template>
    <template #body>Please be patient while we construct more features for our site.</template>
  </PopupMessage>

</template>

<style scoped>

</style>
