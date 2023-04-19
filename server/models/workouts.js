const data = require('../data/workouts.json');
const { connect, ObjectId } = require('./mongo');

const COLLECTION_NAME = 'workouts';

async function collection() {
    const db = await connect();
    return db.collection(COLLECTION_NAME);
}

async function getWorkouts() {
    const col = await collection();
    const workouts = await col.find().toArray();
    return workouts;
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
