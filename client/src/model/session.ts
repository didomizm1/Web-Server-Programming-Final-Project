import data from "../data/users.json"
import { reactive } from "vue";
import { useRouter } from "vue-router";
import type { User } from "./users";

// Reactive session object
const session = reactive({
    user: null as User | null,
});

// Function to use the session
export function useSession() {
    return session;
}

// Login function
export function useLogin() {
    const router = useRouter();

    // Assigns values to a user's properties and redirects to the home page
    return function() {
        console.log({ router });
        session.user = data.users[0];
        router.push("/");
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
