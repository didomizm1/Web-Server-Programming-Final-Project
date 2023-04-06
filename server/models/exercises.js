const data = require('../data/exercises.json');

function getExercises() {
  return data.exercises;
}

function getExerciseByID(id) {
    return data.exercises.find(exercise => exercise.id === id);
}

function addExercise(exercise) {
    exercise.id = data.exercises.length + 1;
    data.exercises.push(exercise);
}

function updateExercise(exercise) {
    const index = data.exercises.findIndex(e => e.id === exercise.id);
    data.exercises[index] = exercise;
}

function deleteExercise(id) {
    const index = data.exercises.findIndex(e => e.id === id);
    data.exercises.splice(index, 1);
}

function searchExercises(searchTerm) {
    return data.exercises.filter(exercise => {
        return exercise.location.toLowerCase().includes(searchTerm.toLowerCase());
    });
}

module.exports = {
    getExercises,
    getExerciseByID,
    addExercise,
    updateExercise,
    deleteExercise,
    searchExercises
};
