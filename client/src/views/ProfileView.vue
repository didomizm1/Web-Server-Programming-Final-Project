<script setup lang="ts">
import { ref } from 'vue';
import { addMessage, useSession } from '../model/session';
import { getUsers, updateUser, type User, type UserPackage } from '../model/users';
import { getExercises, type Exercise } from '../model/exercises';
import ProfilePicture from '../components/ProfilePicture.vue';
import CustomLevel from '../components/CustomLevel.vue';
import FormField from '../components/FormField.vue';
import FileFormField from '../components/FileFormField.vue';

// Reactive session object
const session = useSession();

// Get all exercises associated with logged in user
const exercises = ref<Exercise[]>([]);
getExercises().then((data) => {
  exercises.value = data.data.filter(e => e.userID === session.user?._id);
});

// Get all users
const users = ref<User[]>([]);
getUsers().then((data) => {
    users.value = data.data;
});

// Edit profile form modal functionality
const isModalActive = ref(false);

function toggleModal() {
  isModalActive.value = !isModalActive.value;
  console.log({ isModalActive });
}

// Ref to hold form data about updated user profile information
let updatedUser = ref<User>({
  username: session.user?.username,
  password: session.user?.password,
  email: session.user?.email,
  firstName: session.user?.firstName,
  lastName: session.user?.lastName,
  birthday: session.user?.birthday,
  friendsUserIDs: session.user?.friendsUserIDs,
  role: session.user?.role,
  joinDate: session.user?.joinDate,
} as User);

// Refs to hold the state of validity of form fields
const validEmail = ref(true);
const validUsername = ref(true);

// Save updated profile information
function updateData() { 
  // Check if the e-mail already exists in the database or if the e-mail matches the specifications; always allow a user to reclaim any case variation of their current email
  if (updatedUser.value.email.toLowerCase() != session.user?.email.toLowerCase() && (users.value.find(u => u.email.toLowerCase() === updatedUser.value.email.toLowerCase()) || !/^[^@]*@[^@.]*\.[^@.]*$/.test(updatedUser.value.email))) {
    validEmail.value = false;
    console.log('Invalid e-mail!');
    addMessage('Profile not updated; email invalid', 'danger');
  } else {
    validEmail.value = true;
  }
  
  // Check if the username already exists in the database or if the username matches the specifications; always allow a user to reclaim any case variation of their current username
  if (updatedUser.value.username.toLowerCase() != session.user?.username.toLowerCase() && (users.value.find(u => u.username.toLowerCase() === updatedUser.value.username.toLowerCase()) || !/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/.test(updatedUser.value.username))) {
    validUsername.value = false;
    console.log('Invalid username!');
    addMessage('Profile not updated; username invalid', 'danger');
  } else {
    validUsername.value = true;
  }

  // Update user if form data is valid
  if (validEmail.value && validUsername.value) {
    // Update session with new data
    session.user!.email = updatedUser.value.email;
    session.user!.username = updatedUser.value.username;
    session.user!.firstName = updatedUser.value.firstName;
    session.user!.lastName = updatedUser.value.lastName;
    session.user!.birthday = updatedUser.value.birthday;

    // Package user with external _id
    const userPackage = { _id: session.user?._id, user: updatedUser.value } as UserPackage;

    // Send data to be saved
    updateUser(userPackage).then((data) => {
        console.log(data);
        addMessage('User profile information updated', 'success');
    });

    // Close modal
    toggleModal();
  }
}

</script>

<template>
  <!-- Page that displays profile info and allows the user to edit their details -->
  <template v-if="session.user">
    <div class="container">
      <!-- Profile picture and username -->
      <div class="is-flex is-justify-content-center mt-5">
        <nav class="level mt-6">
          <div class="level-item mr-2">
            <ProfilePicture class="picture" />
          </div>
          <div class="level-item ml-2 mt-5">
            <p class="heading username-text">{{ session.user.username }}</p>
          </div>
        </nav>
      </div>

      <!-- Join date -->
      <CustomLevel class="mt-4">
        <p class="title date-text">Joined {{ session.user.joinDate }}</p>
      </CustomLevel>

      <!-- Horizontal Divider -->
      <hr>

      <!-- Number of friends, exercises, and meals -->
      <CustomLevel class="mt-6">
        <table class="table is-bordered is-hoverable">
          <tr>
            <td>
              <span class="icon"><i class="fas fa-users"></i></span>
              <span class="title table-text ml-2">{{ session.user.friendsUserIDs.length }} Friends</span>
            </td>
            <td>
              <span class="icon"><i class="fas fa-person-skating"></i></span>
              <span class="title table-text ml-2">{{ exercises.length }} Exercises</span>
            </td>
            <td>
              <span class="icon"><i class="fas fa-bowl-rice"></i></span>
              <span class="title table-text ml-2">0 Meals</span>
            </td>
          </tr>   
        </table>
      </CustomLevel>

      <br>
      
      <!-- First and last names -->
      <CustomLevel class="mt-6">
        <p class="title name-text">{{ session.user.firstName }} {{ session.user.lastName }}</p>
      </CustomLevel>

      <!-- Birthday -->
      <CustomLevel class="mt-6">
        <p class="title date-text">Born {{ session.user.birthday }}</p>
      </CustomLevel>

      <!-- E-mail address -->
      <CustomLevel class="mt-4">
        <p class="title email-text">{{ session.user.email }}</p>
      </CustomLevel>
      
      <br><br><br><br>

      <!-- Edit profile button and modal -->
      <CustomLevel class="mb-6">
        <button class="button is-danger is-rounded" @click="toggleModal()">Edit Profile</button>
      </CustomLevel>

      <div class="modal" :class="{ 'is-active': isModalActive }">
        <div class="modal-background"></div>

        <div class="modal-card">
          <header class="modal-card-head has-background-danger">
            <p class="modal-card-title">Edit Profile Information</p>
            <button class="modal-close is-large" @click="toggleModal();"></button>
          </header>

          <section class="modal-card-body">
            <form novalidate @submit.prevent="updateData()">
              <FormField>
                <template #label>
                  Profile Picture
                </template>

                <template #input>
                  <FileFormField>
                    <template #input>
                      <input class="file-input" type="file">
                    </template>
                    <template #icon>
                      <i class="fas fa-image"></i>
                    </template>
                    <template #label>
                      Upload Picture
                    </template>
                  </FileFormField>
                </template>

              </FormField>

              <br>

              <FormField>
                <template #label>
                  E-mail
                </template>

                <template #input>
                  <input class="input" type="email" placeholder="youremail@site.com" v-model="updatedUser.email">
                </template>

                <template #leftIcon>
                  <i class="fas fa-envelope"></i>
                </template>
                <template #rightIcon>
                  <i class="fas fa-check"></i>
                </template>

                <template #error>
                  <div :class="{ 'is-hidden': validEmail }">
                    Invalid e-mail
                  </div>
                </template>

              </FormField>

              <br>

              <FormField>
                <template #label>
                  Username
                </template>

                <template #input>
                  <input class="input" type="text" placeholder="Input username" v-model="updatedUser.username">
                </template>

                <template #leftIcon>
                  <i class="fas fa-user"></i>
                </template>
                <template #rightIcon>
                  <i class="fas fa-check"></i>
                </template>

                <template #error>
                  <div :class="{ 'is-hidden': validUsername }">
                    Invalid username
                  </div>
                </template>

              </FormField>

              <br>

              <FormField>
                <template #label>
                  First Name
                </template>

                <template #input>
                  <input class="input" type="text" placeholder="Your first name" v-model="updatedUser.firstName">
                </template>

                <template #leftIcon>
                  <i class="fas fa-1"></i>
                </template>
                <template #rightIcon>
                  <i class="fas fa-check"></i>
                </template>

              </FormField>

              <FormField>
                <template #label>
                  Last Name
                </template>

                <template #input>
                  <input class="input" type="text" placeholder="Your last name" v-model="updatedUser.lastName">
                </template>

                <template #leftIcon>
                  <i class="fas fa-2"></i>
                </template>
                <template #rightIcon>
                  <i class="fas fa-check"></i>
                </template>

              </FormField>

              <FormField>
                <template #label>
                  Birthday
                </template>

                <template #input>
                  <input class="input date" type="date" v-model="updatedUser.birthday">
                </template>

                <template #leftIcon>
                  <i class="fas fa-calendar"></i>
                </template>
                <template #rightIcon>
                  <i class="fas fa-check"></i>
                </template>

              </FormField>

              <br>

              <FormField>
                <template #label>
                  Confirm Changes
                </template>

                <template #input>
                  <button class="button"><strong>Save</strong></button>
                </template>

              </FormField>
            </form>
          </section>

          <footer class="modal-card-foot has-background-danger"></footer>

        </div>
          
      </div>

    </div>
  </template>
</template>

<style scoped>
td {
  min-width: 5rem;
}
.container {
  width: 50vw;
  min-width: 17rem;
}
.picture {
    width: 10rem;
    min-width: 10rem;
    margin-top: 1.125rem;
    margin-left: 1rem;
}
.username-text {
  font-size: max(1.1rem, 2vw);
  font-weight: bold;
}
.date-text {
  font-size: max(1rem, 1.25vw);
}
.table-text {
  font-size: max(0.8rem, 1.25vw);
}
.name-text {
  font-size: max(1.5rem, 2vw);
  font-weight: bold;
}
.email-text {
  font-size: max(0.7rem, 1.25vw);
}
</style>
