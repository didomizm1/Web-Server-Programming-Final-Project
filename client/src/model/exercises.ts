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

// Function to get exercises
export function getExercises(): Exercise[] {
    return data.exercises;
}
