import { reactive } from "vue";
import { useRouter } from "vue-router";
import * as myFetch from "./myFetch";
import { getUserByID, type User } from "./users";

// Reactive session object
const session = reactive({
    user: null as User | null,
    isLoading: false,
    messages: [] as {
        msg: string,
        type: "success" | "danger" | "warning" | "info",
    }[],
    redirectUrl: null as string | null,
});

// Function to use the session
export function useSession() {
    return session;
}

// Function for myFetch api
export function api(url: string, data?: any, method?: string, headers?: any) {
    session.isLoading = true;
    return myFetch.api(url, data, method, headers)
        .catch(err => {
            console.error({err});
            session.messages.push({
                msg: err.message  ?? JSON.stringify(err),
                type: "danger",
            })
        })
        .finally(() => {
            session.isLoading = false;
        })
}

// Login function
export function useLogin() {
    const router = useRouter();

    // Assigns user data to the session and redirects to the home page
    return function() {
        console.log({ router });
        getUserByID(0).then((data) => {
            session.user = data.data;
        });
        router.push(session.redirectUrl ?? "/");
        session.redirectUrl = null;
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

// Message system
export function addMessage(msg: string, type: "success" | "danger" | "warning" | "info") {
    console.log({msg, type});
    session.messages.push({
        msg,
        type,
    })
}

export function deleteMessage(index: number) {
    session.messages.splice(index, 1);
}
