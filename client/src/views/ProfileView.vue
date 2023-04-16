<script setup lang="ts">
import { ref } from 'vue';
import { useSession } from '../model/session';
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
  exercises.value = data.data.filter(e => e.userID === session.user?.id);
});

// Edit profile form modal functionality
const isModalActive = ref(false);

function toggleModal() {
  isModalActive.value = !isModalActive.value;
  console.log({ isModalActive });
}

// Reset values in the modal to their defaults
const usernameDefault = ref(session.user?.username);
const emailDefault = ref(session.user?.email);
const firstNameDefault = ref(session.user?.firstName);
const lastNameDefault = ref(session.user?.lastName);
const birthdayDefault = ref(session.user?.birthday);

function resetValues() {
  usernameDefault.value = "";
  usernameDefault.value = session.user?.username;
  emailDefault.value = "";
  emailDefault.value = session.user?.email;
  firstNameDefault.value = "";
  firstNameDefault.value = session.user?.firstName;
  lastNameDefault.value = "";
  lastNameDefault.value = session.user?.lastName;
  birthdayDefault.value = "";
  birthdayDefault.value = session.user?.birthday;
}

// Save updated profile information
function updateData() {

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
        <p class="title date-text">Joined 3/18/2023</p>
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
            <button class="modal-close is-large" @click="toggleModal(); resetValues();"></button>
          </header>

          <section class="modal-card-body">
            <form @submit.prevent="updateData()">
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
                
                <template #success>
                  File uploaded
                </template>

              </FormField>

              <br>

              <FormField>
                <template #label>
                  Username
                </template>

                <template #input>
                  <input class="input" type="text" placeholder="Input username" :value="usernameDefault">
                </template>

                <template #leftIcon>
                  <i class="fas fa-user"></i>
                </template>
                <template #rightIcon>
                  <i class="fas fa-check"></i>
                </template>

                <template #help>
                  Must be between 8 and 16 characters long (letters or numbers only)
                </template>
                <template #success>
                  Valid username
                </template>
                <template #error>
                  Invalid username
                </template>

              </FormField>

              <br>

              <FormField>
                <template #label>
                  E-mail
                </template>

                <template #input>
                  <input class="input" type="email" placeholder="youremail@site.com" :value="emailDefault">
                </template>

                <template #leftIcon>
                  <i class="fas fa-envelope"></i>
                </template>
                <template #rightIcon>
                  <i class="fas fa-check"></i>
                </template>

                <template #success>
                  Valid e-mail
                </template>
                <template #error>
                  Invalid e-mail
                </template>

              </FormField>

              <br>

              <FormField>
                <template #label>
                  First Name
                </template>

                <template #input>
                  <input class="input" type="text" placeholder="Your first name" :value="firstNameDefault">
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
                  <input class="input" type="text" placeholder="Your last name" :value="lastNameDefault">
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
                  <input class="input date" type="date" :value="birthdayDefault">
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
                  <button class="button" @click="toggleModal();"><strong>Save</strong></button>
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
