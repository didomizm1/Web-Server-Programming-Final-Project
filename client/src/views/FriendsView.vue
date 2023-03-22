<script setup lang="ts">
import { useSession } from '../model/session';
import { getUserByID } from '../model/users';
import { getExercisesByFriendsUserIDs } from '../model/exercises';
import { getWorkoutByID } from '../model/workouts';
import Banner from '../components/Banner.vue';
import ActivityBox from '../components/ActivityBox.vue';
import ProfilePicture from '../components/ProfilePicture.vue';
import Image from '../components/Image.vue';

// Reactive session object
const session = useSession();

// Get all exercises associated with the logged in user
const exercises = getExercisesByFriendsUserIDs(session.user?.friendsUserIDs as number[]);

</script>

<template>
  <!-- Banner on the top of the page -->
  <Banner>
    <template #title>
      Friends
    </template>
    <template #subtitle>
      View your friends and their activities!
    </template>
  </Banner>

  <div class="container" v-for="exercise, i in exercises">
    <!-- List of a user's exercises -->
    <ActivityBox>
      <template #profilePicture>
        <ProfilePicture />
      </template>

      <template #name>
        {{ getUserByID(exercise.userID).firstName }} {{ getUserByID(exercise.userID).lastName }}
      </template>
      <template #username>
        {{ getUserByID(exercise.userID).username }}
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
