<script setup lang="ts">
import { ref } from 'vue';
import { useSession } from '../model/session';
import { getUsers, type User } from '../model/users';
import { getExercises, type Exercise } from '../model/exercises';
import { getWorkouts, type Workout } from '../model/workouts';
import Banner from '../components/Banner.vue';
import PopupMessage from '../components/PopupMessage.vue';
import ActivityBox from '../components/ActivityBox.vue';
import ProfilePicture from '../components/ProfilePicture.vue';
import Image from '../components/Image.vue';

// Save current page
localStorage.setItem('currentPage', '/friends');

// Reactive session object
const session = useSession();

// Get all users that are friends of the logged in user
const users = ref<User[]>([]);
getUsers().then((data) => {
  users.value = data.data.filter(u => session.user?.friendsUserIDs.includes(u._id as string));
});

// Get all exercises of logged in user's friends
const exercises = ref<Exercise[]>([]);
getExercises().then((data) => {
  exercises.value = data.data.filter(e => session.user?.friendsUserIDs.includes(e.userID));
});

// Get all workouts
const workouts = ref<Workout[]>([]);
getWorkouts().then((data) => {
  workouts.value = data.data;
});

</script>

<template>
  <!-- Banner on the top of the page -->
  <Banner>
    <template #title>
      Friends
    </template>
    <template #subtitle>
      View your friends' activities!
    </template>
  </Banner>
  
  <!-- Message if no friends have exercises -->
  <PopupMessage v-if="exercises.length == 0">
    <template #header>
      No friend exercises available!
    </template>
    <template #body>
      Sorry, none of your friends have shared their exercises yet! Encourage them to post their activity or add new friends in the user search page to see their workouts!
    </template>
  </PopupMessage>

  <div class="container activity-container" v-for="exercise, i in exercises">
    <!-- List of a user's exercises -->
    <ActivityBox>
      <template #profilePicture>
        <ProfilePicture />
      </template>

      <template #name>
        {{ users.find(u => u._id === exercise.userID)?.firstName }} {{ users.find(u => u._id === exercise.userID)?.lastName }}
      </template>
      <template #username>
        {{ users.find(u => u._id === exercise.userID)?.username }}
      </template>
      <template #timestamp>
        {{ exercise.date }}
      </template>
      <template #workout>
        {{ workouts.find(w => w._id === exercise.workoutID)?.name }}
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
.activity-container {
  margin-left: 8vw;
  margin-right: 8vw;
}
.exercise-image {
    width: max(25vw, 15rem);
}
</style>
