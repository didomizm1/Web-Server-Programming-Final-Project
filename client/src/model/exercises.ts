import type { DataEnvelope, DataListEnvelope } from "./myFetch";
import { api } from "./session";

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
export function getExercises(): Promise<DataListEnvelope<Exercise>> {
    return api('exercises')
}

// Function to get exercises with a certain user ID
export function getExercisesByUserID(userID: number): Promise<DataListEnvelope<Exercise>> {
    return api(`exercises/${userID}`)
}

// Function to create a new exercise for a user
export function createExercise(exercise: Exercise): Promise<DataEnvelope<Exercise>> {
    return api('exercises', exercise)
}
