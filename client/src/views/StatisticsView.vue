<script setup lang="ts">
import { ref } from 'vue';
import { useSession } from '../model/session';
import { getExercises, type Exercise } from '../model/exercises';
import Banner from '../components/Banner.vue';
import StatsBox from '../components/StatsBox.vue';

// Reactive session object
const session = useSession();

// Get all exercises associated with logged in user
const exercises = ref<Exercise[]>([]);
getExercises().then((data) => {
  exercises.value = data.data.filter(e => e.userID === session.user?.id);
  categorizeExercises();
});

const keys = ref<string[]>([]); // Contains the keys which are the indices of each list in values
const values = ref<Exercise[][]>([]); // Contains arrays; in each array, there are the exercises for a certain day
function categorizeExercises() {
    exercises.value.forEach(e => {
        // Date of current exercise
        const currentDate = e.date;

        // Add new entry in keys for current date if it does not already exist in the keys array
        if (!(keys.value.includes(currentDate))) {
            keys.value.push(currentDate);

            // Create new empty array in values for exercises of current date
            const newArray: Exercise[] = [];
            values.value.push(newArray);
        }

        // Add new exercise to array in values associated with current date
        const arrayIndex = keys.value.indexOf(currentDate);
        values.value[arrayIndex].push(e);
    })
}

</script>

<template>
    <!-- Banner on the top of the page -->
    <Banner>
        <template #title>
            Statistics
        </template>
        <template #subtitle>
            View detailed stats about your routine!
        </template>
    </Banner>

    <!-- Statistics for each date where a user posted an exercise -->
    <template v-for="date, i in keys">
        <StatsBox>
            <div class="content">
                {{ date }}
            </div>
        </StatsBox>
    </template>

</template>

<style scoped>

</style>