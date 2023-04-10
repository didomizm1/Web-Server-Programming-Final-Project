import type { DataEnvelope, DataListEnvelope } from "./myFetch";
import { api } from "./session";

// Blueprint for a workout
export interface Workout {
    id: number;
    name: string;
    caloriesPerMinute: number;
}

// Function to get workouts
export function getWorkouts(): Promise<DataListEnvelope<Workout>> {
    return api('workouts')
}

// Function to get a workout by its ID
export function getWorkoutByID(id: number): Promise<DataEnvelope<Workout>> {
    return api(`workouts/${id}`)
}

// Function to create a new workout
export function createWorkout(workout: Workout): Promise<DataEnvelope<Workout>> {
    return api('workouts', workout)
}
