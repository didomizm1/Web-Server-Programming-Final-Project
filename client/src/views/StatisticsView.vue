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

// Blueprint for an object containing data about a single day's exercises
interface ExerciseData {
    distance: number;
    duration: number;
    pace: number;
    calories: number;
}

const keys = ref<string[]>([]); // Contains the keys which are the indices of each array in values
const values = ref<Exercise[][]>([]); // Contains arrays; in each array, there are the exercises for a certain day
const computedData = ref<ExerciseData[]>([]); // Contains computed values from the exercises for each date 

// Separates exercises into arrays based upon their date
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

    // Use separated exercises to calculate statistics values
    computations();
}

// Calculates statistics per day based upon exercises 
function computations() {
    // Iterate through arrays of exercises
    values.value.forEach(currentDayExercises => {
        // Initial data values in object
        const newExerciseData: ExerciseData = {
            distance: 0,
            duration: 0,
            pace: 0,
            calories: 0
        }

        // Iterate through exercises within an array
        currentDayExercises.forEach(currentExercise => {
            // Increment data values
            newExerciseData.distance += currentExercise.distance;
            newExerciseData.duration += currentExercise.duration;
        })

        // Add computed data to object and add object to array
        computedData.value.push(newExerciseData);
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
    <div class="container" v-for="date, i in keys">
        <StatsBox>
            <template #date>{{ date }}</template>
            <template #distance>{{ computedData[i].distance }} Miles</template>
            <template #duration>{{ computedData[i].duration }} Minutes</template>
            <template #pace>{{ computedData[i].pace }} MPH</template>
            <template #calories>{{ computedData[i].calories }} Calories Burned</template>
        </StatsBox>
    </div>

</template>

<style scoped>
.container {
  margin-left: 15vw;
  margin-right: 15vw;
}
</style>