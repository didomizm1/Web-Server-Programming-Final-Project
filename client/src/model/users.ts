import type { DataEnvelope, DataListEnvelope } from "./myFetch";
import { api } from "./session";

// Blueprint for a user
export interface User {
    _id?: string;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    friendsUserIDs: string[];
    role: string;
    joinDate: string;
    profilePicture?: string;
    token?: string;
}

// Defines an abstract form of a user with the _id placed externally; used for patching
export interface UserPackage {
    _id: string;
    user: User;
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

// Function to update a user's information
export function updateUser(userPackage: UserPackage): Promise<DataEnvelope<UserPackage>> {
    return api('users', userPackage, 'PATCH')
}
