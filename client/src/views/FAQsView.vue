<script setup lang="ts">
import Banner from '../components/Banner.vue';
import PageBox from '../components/PageBox.vue';
import QuestionAnswer from '../components/QuestionAnswer.vue';
import SiteLogo from '../components/SiteLogo.vue';
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
          What is SushiFit?
        </template>
        <template #a>
          SushiFit is a fitness app that allows you to keep track of daily activities, including your exercises and meals.
          You will be able to see statistics about the information you enter, and you can look back at your history as well.
        </template>
      </QuestionAnswer>

      <QuestionAnswer>
        <template #q>
          Do I need to make an account to use the app?
        </template>
        <template #a>
          Yes, an account is required to use SushiFit. You can regster by clicking the "Sign Up" button at the top right corner
          of the screen on desktop, or in the menu on mobile. 
        </template>
      </QuestionAnswer>

      <QuestionAnswer>
        <template #q>
          Can other people see my exercises?
        </template>
        <template #a>
          You are able to become friends with other users on SushiFit if you desire, so you will be able to view activity that
          they post about and vice versa!
        </template>
      </QuestionAnswer>

      <QuestionAnswer>
        <template #q>
          How can I find other users?
        </template>
        <template #a>
          To search for other users and friend them, navigate to the "User Search" page and type in the name of the person you wish to find.
        </template>
      </QuestionAnswer>

      <QuestionAnswer>
        <template #q>
          Can I change my profile information?
        </template>
        <template #a>
          Yes! Any information that you wish to change can be viewed and edited on the "Profile" page. Scroll to the bottom and click "Edit Profile",
          then save any changes.
        </template>
      </QuestionAnswer>

      <QuestionAnswer>
        <template #q>
          What new features are planned?
        </template>
        <template #a>
          In the future, the ability to track hydration and sleep will be added to SushiFit!
        </template>
      </QuestionAnswer>

    </div>
  </PageBox>

  <!-- Site logo -->
  <SiteLogo />

</template>

<style scoped>

</style>
