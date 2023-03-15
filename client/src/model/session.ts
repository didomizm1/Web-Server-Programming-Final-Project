import { reactive } from "vue";
import { useRouter } from "vue-router";

// Reactive session object
const session = reactive({
    user: null as User | null,
});

// Basic blueprint for a user
interface User {
    userID: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    token?: string;
}

// Function to use the session
export function useSession() {
    return session;
}

// Login function
export function login() {
    session.user = {
        userID: 0,
        username: "testuser",
        email: "testemail@email.com",
        firstName: "Test",
        lastName: "User",
        birthday: "0/0/0000",
    }
}

// Logout function
export function useLogout() {
    const router = useRouter()

    // Sets user to null and redirects to login page
    return function() {
        console.log({ router });
        session.user = null;
        router.push("/login");
    }
}