import data from "../data/users.json"

// Blueprint for a user
export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    friendsUserIDs: number[];
    profilePicture?: string;
}

// Function to get users
export function getUsers(): User[] {
    return data.users;
}
