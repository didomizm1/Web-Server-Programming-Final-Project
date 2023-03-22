import data from "../data/exercises.json"

// Blueprint for an exercise
export interface Exercise {
    userID: number;
    workoutID: number;
    location: string;
    distance: number;
    duration: number;
    timestamp: string;
    image?: string;
}

// Function to get all exercises
export function getExercises(): Exercise[] {
    return data.exercises;
}

// Function to get exercises with a certain user ID
export function getExercisesByUserID(id: number): Exercise[] {
    return data.exercises.filter((e) => e.userID == id);
}
