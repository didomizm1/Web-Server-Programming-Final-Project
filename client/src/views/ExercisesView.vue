<script setup lang="ts">
import { useSession } from '../model/session';
import { getExercisesByUserID } from '../model/exercises';
import { getWorkoutByID } from '../model/workouts';
import Banner from '../components/Banner.vue';
import ActivityBox from '../components/ActivityBox.vue';
import ProfilePicture from '../components/ProfilePicture.vue';
import Image from '../components/Image.vue';

// Reactive session object
const session = useSession();

// Get all exercises associated with the logged in user
const exercises = getExercisesByUserID(session.user?.id as number);

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

  <div class="container" v-for="exercise, i in exercises">
    <!-- List of a user's exercises -->
    <ActivityBox>
      <template #profilePicture>
        <ProfilePicture />
      </template>

      <template #name>
        {{ session.user?.firstName }} {{ session.user?.lastName }}
      </template>
      <template #username>
        {{ session.user?.username }}
      </template>
      <template #timestamp>
        {{ exercise.timestamp }}
      </template>
      <template #workout>
        {{ getWorkoutByID(exercise.workoutID).name }}
      </template>
      <template #location>
        {{ exercise.location }}
      </template>

      <template #distance>
        {{ exercise.distance }}
      </template>
      <template #duration>
        {{ exercise.duration }}
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
