import data from "../data/workouts.json"

// Blueprint for a workout
export interface Workout {
    id: number;
    name: string;
}

// Function to get workouts
export function getWorkouts(): Workout[] {
    return data.workouts;
}
