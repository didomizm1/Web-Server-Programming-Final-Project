<script setup lang="ts">
import Banner from '../components/Banner.vue';
import CustomBox from '../components/CustomBox.vue';
import QuestionAnswer from '../components/QuestionAnswer.vue';
</script>

<template>
  <!-- Banner on the top of the page -->
  <Banner>
    <template #title>
      About Us
    </template>
  </Banner>

  <!-- Main text content of the about page -->
  <CustomBox>
    <div class="content">
      <QuestionAnswer>
        <template #q>
          Why choose SushiFit?
        </template>
        <template #a>
          Text.
        </template>
      </QuestionAnswer>
    </div>
  </CustomBox>

</template>

<style scoped>

</style>
