import type { DataEnvelope, DataListEnvelope } from "./myFetch";
import { api } from "./session";

// Blueprint for a user
export interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    friendsUserIDs: string[];
    profilePicture?: string;
}

// Function to get users
export function getUsers(): Promise<DataListEnvelope<User>> {
    return api('users')
}

// Function to get a user by their ID
export function getUserByID(id: string): Promise<DataEnvelope<User>> {
    return api(`users/${id}`)
}

// Function to create a new user
export function createUser(user: User): Promise<DataEnvelope<User>> {
    return api('users', user)
}
