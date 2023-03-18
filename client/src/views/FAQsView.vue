<script setup lang="ts">
import Banner from '../components/Banner.vue';
import PageBox from '../components/PageBox.vue';
import QuestionAnswer from '../components/QuestionAnswer.vue';
</script>

<template>
  <!-- Banner on the top of the page -->
  <Banner>
    <template #title>
      Frequently Asked Questions
    </template>
  </Banner>

  <!-- Set of questions and their corresponding answers -->
  <PageBox>
    <div class="content">
      <QuestionAnswer>
        <template #q>
          Question 1?
        </template>
        <template #a>
          Answer 1.
        </template>
      </QuestionAnswer>

      <QuestionAnswer>
        <template #q>
          Question 2?
        </template>
        <template #a>
          Answer 2.
        </template>
      </QuestionAnswer>

      <QuestionAnswer>
        <template #q>
          Question 3?
        </template>
        <template #a>
          Answer 3.
        </template>
      </QuestionAnswer>

      <QuestionAnswer>
        <template #q>
          Question 4?
        </template>
        <template #a>
          Answer 4.
        </template>
      </QuestionAnswer>

      <QuestionAnswer>
        <template #q>
          Question 5?
        </template>
        <template #a>
          Answer 5.
        </template>
      </QuestionAnswer>

      <QuestionAnswer>
        <template #q>
          Question 6?
        </template>
        <template #a>
          Answer 6.
        </template>
      </QuestionAnswer>

    </div>
  </PageBox>

</template>

<style scoped>

</style>
