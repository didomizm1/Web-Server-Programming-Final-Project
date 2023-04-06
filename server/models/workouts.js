const data = require('../data/workouts.json');

function getWorkouts() {
  return data.workouts;
}

function getWorkoutByID(id) {
    return data.workouts.find(workout => workout.id === id);
}

function addWorkout(workout) {
    workout.id = data.workouts.length + 1;
    data.workouts.push(workout);
}

function updateWorkout(workout) {
    const index = data.workouts.findIndex(w => w.id === workout.id);
    data.workouts[index] = workout;
}

function deleteWorkout(id) {
    const index = data.workouts.findIndex(w => w.id === id);
    data.workouts.splice(index, 1);
}

function searchWorkouts(searchTerm) {
    return data.workouts.filter(workout => {
        return workout.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
}

module.exports = {
    getWorkouts,
    getWorkoutByID,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    searchWorkouts
};
