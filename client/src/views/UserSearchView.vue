<script setup lang="ts">
import { ref } from 'vue';
import { useSession } from '../model/session';
import { getUsers, type User } from '../model/users'
import Banner from '../components/Banner.vue';

// Reactive session object
const session = useSession();

// Get all users
const users = ref<User[]>([]);
getUsers().then((data) => {
    users.value = data.data;
});

</script>

<template>
    <!-- Banner on the top of the page -->
    <Banner>
        <template #title>
            User Search
        </template>
    </Banner>

    <!-- Table to display information about available users -->
    <div class="container">
        <table class="table is-bordered is-narrow is-fullwidth is-striped is-hoverable">
            <thead>
                <tr>
                    <th></th>
                    <th scope="col">Username</th>
                    <th scope="col">First Name</th>
                    <th v-if="session.user"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user._id">
                    <td> 
                        <img :src="user.profilePicture" alt="" class="user-profile-picture">
                    </td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.firstName }}</td>
                    <td v-if="session.user">
                        <button class="button" @click="">
                            <div class="icon">
                                <i class="fas fa-user-plus"></i>
                            </div>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<style scoped>
.user-profile-picture {
    width: 50px;
    height: 50px;
    object-fit: cover;
}
</style>