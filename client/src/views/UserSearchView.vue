<script setup lang="ts">
import { ref } from 'vue';
import { addMessage, useSession } from '../model/session';
import { getUsers, updateUser, type User, type UserPackage } from '../model/users'
import Banner from '../components/Banner.vue';

// Reactive session object
const session = useSession();

// Get all users
const users = ref<User[]>([]);
getUsers().then((data) => {
    users.value = data.data;
});

// Save information updated user
function updateData(friendID: string, mode: string) {
    // Update session with new data
    // If adding a friend, push, otherwise splice
    if (mode == "add") {
        session.user?.friendsUserIDs.push(friendID);
    } else if (mode == "remove") {
        const index = session.user?.friendsUserIDs.indexOf(friendID) as number;
        session.user?.friendsUserIDs.splice(index, 1);
    }

    // Remove _id from data to be sent
    const userToSend = {
        username: session.user?.username,
        password: session.user?.password,
        email: session.user?.email,
        firstName: session.user?.firstName,
        lastName: session.user?.lastName,
        birthday: session.user?.birthday,
        friendsUserIDs: session.user?.friendsUserIDs,
        role: session.user?.role,
        joinDate: session.user?.joinDate,
    } as User;

    // Package user with external _id
    const userPackage = { _id: session.user?._id, user: userToSend } as UserPackage;

    // Send data to be saved
    updateUser(userPackage).then((data) => {
        console.log(data);
        addMessage('User friends list updated', 'success');
    });
}

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
                        <template v-if="session.user._id != user._id">
                            <button class="button" @click="updateData(user._id as string, 'add')" v-if="!session.user.friendsUserIDs.includes(user._id as string)">
                                <div class="icon">
                                    <i class="fas fa-user-plus"></i>
                                </div>
                            </button>
                            <button class="button" @click="updateData(user._id as string, 'remove')" v-else>
                                <div class="icon">
                                    <i class="fas fa-user-minus"></i>
                                </div>
                            </button>
                        </template>
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