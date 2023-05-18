<script setup lang="ts">
import { ref } from 'vue';
import { addMessage, useSession } from '../model/session';
import { getExercises, createExercise, type Exercise } from '../model/exercises';
import { getWorkouts, type Workout } from '../model/workouts';
import { getUsers, searchUsers, type User } from '../model/users'
import AutoComplete from 'primevue/AutoComplete';
import Banner from '../components/Banner.vue';
import CustomLevel from '../components/CustomLevel.vue';
import ActivityBox from '../components/ActivityBox.vue';
import ProfilePicture from '../components/ProfilePicture.vue';
import Image from '../components/Image.vue';
import FormField from '../components/FormField.vue';
import FileFormField from '../components/FileFormField.vue';
import { isTemplateSpan } from 'typescript';

// Save current page
localStorage.setItem('currentPage', '/exercises');

// Reactive session object
const session = useSession();

// Get all exercises associated with logged in user
const exercises = ref<Exercise[]>([]);
getExercises().then((data) => {
  exercises.value = data.data.filter(e => e.userID === session.user?._id);
});

// Get all workouts
const workouts = ref<Workout[]>([]);
getWorkouts().then((data) => {
  workouts.value = data.data;
});

// Get all users
const users = ref<User[]>([]);
getUsers().then((data) => {
    users.value = data.data;
});

// Add exercise form modal functionality
const isModalActive = ref(false);

function toggleModal() {
  isModalActive.value = !isModalActive.value;
  console.log({ isModalActive });
}

// Refs to hold form data about a newly created exercise
let newExercise = ref<Exercise>({} as Exercise);
let newExerciseWorkoutName = ref("");
const addedUsersList = ref("");
const searchedUsers = ref();

async function search(event: { query: string}) {
  searchUsers(event.query).then((data) => {
    searchedUsers.value = data.data;
  });;
}

// Save new exercise
function updateData() {
  // Append current user ID and workout ID to exercise data
  newExercise.value.userID = session.user!._id as string;
  newExercise.value.workoutID = workouts.value.find(w => w.name === newExerciseWorkoutName.value)!._id;

  // Add new exercise to exercises ref
  exercises.value.push(newExercise.value);

  // Update Database
  createExercise(newExercise.value).then((data) => {
    console.log(data);
    addMessage('Exercise created', 'success');
  });

  // Reset exercise refs to a default state to be ready for the next exercise addition
  newExercise = ref<Exercise>({} as Exercise);
  newExerciseWorkoutName = ref("");
}

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

  <!-- Add new exercise button and modal -->
  <div class="container">
    <CustomLevel class="mb-6">
      <button class="button is-danger is-rounded" @click="toggleModal()">Add New Exercise</button>
    </CustomLevel>
  </div>
  
  <div class="modal" :class="{ 'is-active': isModalActive }">
    <div class="modal-background"></div>

    <div class="modal-card">
      <header class="modal-card-head has-background-danger">
        <p class="modal-card-title">Add New Exercise</p>
        <button class="modal-close is-large" @click="toggleModal();"></button>
      </header>

      <section class="modal-card-body">
        <form novalidate @submit.prevent="updateData()">
          <FormField>
            <template #label>
              Exercise Picture
            </template>

            <template #input>
              <FileFormField>
                <template #input>
                  <input class="file-input" type="file">
                </template>
                <template #icon>
                  <i class="fas fa-image"></i>
                </template>
                <template #label>
                  Upload Picture
                </template>
              </FileFormField>
            </template>

          </FormField>

          <br>

          <FormField>
            <template #label>
              Workout
            </template>

            <template #input>
              <div class="select is-rounded">
                <select v-model="newExerciseWorkoutName">
                  <option disabled value="">Select Workout</option>
                  <template v-for="workout, i in workouts">
                    <option>
                      {{ workout.name }}
                    </option>
                  </template>
                </select>
              </div>
            </template>

            <template #leftIcon>
              <i class="fas fa-dumbbell"></i>
            </template>

          </FormField>

          <br>

          <FormField>
            <template #label>
              Tag Friends
            </template>
          </FormField>

          <AutoComplete v-model="addedUsersList" multiple optionLabel="username" :suggestions="searchedUsers" @complete="search" />

          <br><br><br>

          <FormField>
            <template #label>
              Location
            </template>

            <template #input>
              <input class="input" type="text" placeholder="Enter location" v-model="newExercise.location">
            </template>

            <template #leftIcon>
              <i class="fas fa-map-location-dot"></i>
            </template>
            <template #rightIcon>
              <i class="fas fa-check"></i>
            </template>

          </FormField>

          <br>

          <FormField>
            <template #label>
              Distance
            </template>

            <template #input>
              <input class="input" type="number" min="0" step=".1" placeholder="Enter distance in miles" v-model="newExercise.distance">
            </template>

            <template #leftIcon>
              <i class="fas fa-road"></i>
            </template>
            <template #rightIcon>
              <i class="fas fa-check"></i>
            </template>

          </FormField>

          <br>

          <FormField>
            <template #label>
              Duration
            </template>

            <template #input>
              <input class="input" type="number" min="0" step=".1" placeholder="Enter duration in minutes" v-model="newExercise.duration">
            </template>

            <template #leftIcon>
              <i class="fas fa-stopwatch"></i>
            </template>
            <template #rightIcon>
              <i class="fas fa-check"></i>
            </template>

          </FormField>

          <FormField>
            <template #label>
              Date
            </template>

            <template #input>
              <input class="input date" type="date" v-model="newExercise.date">
            </template>

            <template #leftIcon>
              <i class="fas fa-calendar"></i>
            </template>
            <template #rightIcon>
              <i class="fas fa-check"></i>
            </template>

          </FormField>

          <br>

          <FormField>
            <template #label>
              Confirm Changes
            </template>

            <template #input>
              <button class="button" @click="toggleModal();"><strong>Save</strong></button>
            </template>

          </FormField>
        </form>
      </section>

      <footer class="modal-card-foot has-background-danger"></footer>

    </div>
      
  </div>

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
.container {
  margin-left: 8vw;
  margin-right: 8vw;
}
.exercise-image {
    width: max(25vw, 15rem);
}
</style>
