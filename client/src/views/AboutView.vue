<script setup lang="ts">
import Banner from '../components/Banner.vue';
import PageBox from '../components/PageBox.vue';
import QuestionAnswer from '../components/QuestionAnswer.vue';
import SiteLogo from '../components/SiteLogo.vue';

// Save current page
localStorage.setItem('currentPage', '/about');

</script>

<template>
  <!-- Banner on the top of the page -->
  <Banner>
    <template #title>
      About Us
    </template>
  </Banner>

  <!-- Main text content of the about page -->
  <PageBox>
    <div class="content">
      <QuestionAnswer>
        <template #q>
          Welcome to SushiFit!
        </template>
        <template #a>
          SushiFit is a fresh take on a reactive, mobile-first web application which acts as a fitness app! With SushiFit, you can track your exercise and meal routines, 
          allowing you to review your logs of past days and events, as well as receive statistics about the data you enter. Additionally, you can link together with your 
          friends and family and share your activity with them! A unique and uncluttered design allows you to enter and review your activities with ease -- happy exercising!
        </template>
      </QuestionAnswer>
    </div>
  </PageBox>

  <!-- Site logo -->
  <SiteLogo />

</template>

<style scoped>

</style>
