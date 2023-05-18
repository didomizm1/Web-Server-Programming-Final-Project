import type { DataEnvelope, DataListEnvelope } from "./myFetch";
import { api } from "./session";

// Blueprint for an exercise
export interface Exercise {
    _id: string;
    userID: string;
    workoutID: string;
    location: string;
    distance: number;
    duration: number;
    date: string;
    image?: string;
    taggedUsers?: string;
}

// Function to get all exercises
export function getExercises(): Promise<DataListEnvelope<Exercise>> {
    return api('exercises')
}

// Function to get an exercise by its ID
export function getExerciseByID(id: string): Promise<DataEnvelope<Exercise>> {
    return api(`exercises/${id}`)
}

// Function to create a new exercise for a user
export function createExercise(exercise: Exercise): Promise<DataEnvelope<Exercise>> {
    return api('exercises', exercise)
}
