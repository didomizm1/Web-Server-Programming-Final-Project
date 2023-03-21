<script setup lang="ts">
import Banner from '../components/Banner.vue';
import ActivityBox from '../components/ActivityBox.vue';
import ProfilePicture from '../components/ProfilePicture.vue';
import Image from '../components/Image.vue';
</script>

<template>
  <!-- Banner on the top of the page -->
  <Banner>
    <template #title>
      My Exercises
    </template>
    <template #subtitle>
      Track your workouts below!
    </template>
  </Banner>

  <div class="container">
    <!-- List of a user's exercises -->
    <ActivityBox>
      <template #profilePicture>
        <ProfilePicture />
      </template>

      <template #name>
        Test User
      </template>
      <template #username>
        testuser
      </template>
      <template #timestamp>
        12:00 3/18/23
      </template>
      <template #workout>
        Ice Skating
      </template>
      <template #location>
        New Paltz
      </template>

      <template #distance>
        5.28
      </template>
      <template #duration>
        28
      </template>
      <template #image>
        <Image class="exercise-image" />
      </template>
    </ActivityBox>
  </div>
  

</template>

<style scoped>
.container {
  margin-left: 8vw;
  margin-right: 8vw;
}
.exercise-image {
    width: max(25vw, 15rem);
}
</style>
