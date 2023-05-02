<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { addMessage, useSession } from '../model/session';
import { createUser, getUsers, type User } from '../model/users';
import Banner from '../components/Banner.vue';
import FormField from '../components/FormField.vue';
import PopupMessage from '../components/PopupMessage.vue';
import SiteLogo from '../components/SiteLogo.vue';
import PageBox from '../components/PageBox.vue';

// Reactive session object
const session = useSession();

// Router
const router = useRouter();

// Get all users
const users = ref<User[]>([]);
getUsers().then((data) => {
    users.value = data.data;
});

// Current date
const date = new Date();

// Refs to hold the state of validity of required form fields
const validEmail = ref(true);
const validPassword = ref(true);
const validUsername = ref(true);
const reenteredPassword = ref<string>();
const passwordMatches = ref(true);

// Ref to hold form data about a prospective new user
const newUser = ref<User>({
  username: "",
  password: "",
  email: "",
  firstName: "",
  lastName: "",
  birthday: "",
  friendsUserIDs: [],
  role: "user",
  joinDate: `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`,
} as User);

// Save information about a new user to the database
function updateData() {
  // Check if the e-mail already exists in the database or if the e-mail matches the specifications
  if (users.value.find(u => u.email.toLowerCase() === newUser.value.email.toLowerCase()) || !/^[^@]*@[^@.]*\.[^@.]*$/.test(newUser.value.email)) {
    validEmail.value = false;
    console.log('Invalid e-mail!');
    addMessage('User not created; email invalid', 'danger');
  } else {
    validEmail.value = true;
  }

  // Check if password matches the specifications
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&?_])[a-zA-Z\d!@#$%&?_]{8,}$/.test(newUser.value.password)) {
    validPassword.value = false;
    console.log('Invalid password!');
    addMessage('User not created; password invalid', 'danger');
  } else {
    validPassword.value = true;
  }

  // Check if re-entered password matches the first password
  if (reenteredPassword.value != newUser.value.password) {
    passwordMatches.value = false;
    console.log('Passwords do not match!');
    addMessage('User not created; passwords do not match', 'danger');
  } else {
    passwordMatches.value = true;
  }
  
  // Check if the username already exists in the database or if the username matches the specifications
  if (users.value.find(u => u.username.toLowerCase() === newUser.value.username.toLowerCase()) || !/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/.test(newUser.value.username)) {
    validUsername.value = false;
    console.log('Invalid username!');
    addMessage('User not created; username invalid', 'danger');
  } else {
    validUsername.value = true;
  }
  
  // Create new user if form data is valid
  if (validEmail.value && validPassword.value && passwordMatches.value && validUsername.value) {
    createUser(newUser.value).then((data) => {
      console.log(data);
      addMessage('New user created', 'success');
    });

    // Redirect to login page
    router.push(session.redirectUrl ?? "/login");
    session.redirectUrl = null;
  }
}

</script>

<template>
  <!-- Banner on the top of the page -->
  <Banner>
    <template #title>
      Registration
    </template>
    <template #subtitle>
      Sign up below.
    </template>
  </Banner>

  <!-- Registration form -->
  <form class="block" novalidate @submit.prevent="updateData()">
    <PageBox>
      <FormField>
        <template #label>
          E-mail *
        </template>

        <template #input>
          <input class="input" type="email" placeholder="youremail@site.com" v-model="newUser.email">
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

      <FormField>
        <template #label>
          Password *
        </template>

        <template #input>
          <input class="input" type="password" placeholder="Input password" v-model="newUser.password">
        </template>

        <template #leftIcon>
          <i class="fas fa-lock"></i>
        </template>
        <template #rightIcon>
          <i class="fas fa-check"></i>
        </template>

        <template #help>
          Must be at least 8 characters long and contain at least one uppercase letter, lowercase letter, number, and symbol [ <strong>!@#$%&?_</strong> ]
        </template>
        <template #error>
          <div :class="{ 'is-hidden': validPassword }">
            Invalid password
          </div>
        </template>

      </FormField>
      <FormField>
        <template #label>
          Re-enter Password *
        </template>

        <template #input>
          <input class="input" type="password" placeholder="Input password" v-model="reenteredPassword">
        </template>

        <template #leftIcon>
          <i class="fas fa-key"></i>
        </template>
        <template #rightIcon>
          <i class="fas fa-check"></i>
        </template>

        <template #error>
          <div :class="{ 'is-hidden': passwordMatches }">
            Passwords do not match
          </div>
        </template>

      </FormField>

      <br>

      <FormField>
          <template #label>
            Username *
          </template>

          <template #input>
            <input class="input" type="text" placeholder="Input username" v-model="newUser.username">
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
          <input class="input" type="text" placeholder="Your first name" v-model="newUser.firstName">
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
          <input class="input" type="text" placeholder="Your last name" v-model="newUser.lastName">
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
          <input class="input date" type="date" v-model="newUser.birthday">
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
          Submit
        </template>

        <template #input>
          <button class="button"><strong>Sign Up</strong></button>
        </template>

      </FormField>
    </PageBox>
  </form>

  <!-- Message to advertise registration -->
  <PopupMessage>
    <template #header>
      Already have an account?
    </template>
    <template #body>
      Click the login button to sign in and view your profile!
    </template>
  </PopupMessage>

  <!-- Site logo on the bottom of the page -->
  <SiteLogo />

</template>

<style scoped>
.date {
  width: 13rem;
}
</style>
