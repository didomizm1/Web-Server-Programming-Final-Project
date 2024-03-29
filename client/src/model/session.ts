import { reactive, type Ref } from "vue";
import { useRouter } from "vue-router";
import * as myFetch from "./myFetch";
import type { User } from "./users";

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
    
    if(session.user?.token){
        headers = {
            "Authorization": `Bearer ${session.user.token}`,
            ...headers,
        }
    }
    
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
export function useLogin(emailRef: Ref<string | undefined>, passwordRef: Ref<string | undefined>) {
    const router = useRouter();
    
    // Assigns user data to the session and redirects
    return async function() {
        const response = await api("users/login", {
            "email": emailRef.value,
            "password": passwordRef.value
        });
        
        session.user = response.data.user;
        if(!session.user) {
            addMessage("User not found", "danger");
            return;
        }
        
        localStorage.setItem('email', emailRef.value as string);
        localStorage.setItem('password', passwordRef.value as string);

        session.user.token = response.data.token;

        const currentPage = localStorage.getItem('currentPage');

        if (currentPage && currentPage != "/login") {
            router.push(currentPage);
        }
        else {
            router.push(session.redirectUrl ?? "/");
        }
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
        localStorage.removeItem('email');
        localStorage.removeItem('password');
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
