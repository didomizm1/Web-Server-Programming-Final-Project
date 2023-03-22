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

// Function to get a workout by its ID
export function getWorkoutByID(id: number): Workout {
    return data.workouts.find((w) => w.id == id) as Workout;
}
