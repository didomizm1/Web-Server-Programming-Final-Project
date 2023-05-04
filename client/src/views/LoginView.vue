<script setup lang="ts">
import { ref } from 'vue';
import { loadScript, rest } from '../model/myFetch';
import { addMessage, useLogin } from '../model/session';
import { type User, getUsers, createUser } from '../model/users';
import Banner from '../components/Banner.vue';
import PopupMessage from '../components/PopupMessage.vue';
import PageBox from '../components/PageBox.vue';
import FormField from '../components/FormField.vue';
import SiteLogo from '../components/SiteLogo.vue';

// Get all users
const users = ref<User[]>([]);
getUsers().then((data) => {
    users.value = data.data;
});

// Refs to hold information from the form
const formEmail = ref<string>();
const formPassword = ref<string>();

// Ref to hold the state of form field validity
const validFields = ref(true);

// Login function
const login = useLogin(formEmail, formPassword);

// Ensure login information is valid
function validateData() {
  // Transform e-mail into a lowercase version
  formEmail.value = formEmail.value?.toLowerCase();

  // Find user in the database by their e-mail
  const userToLogin = users.value.find(u => u.email === formEmail.value)

  // Check if user exists and if their password is valid
  if(!userToLogin || userToLogin.password != formPassword.value) {
    validFields.value = false;
    console.log("E-mail or password invalid");
    addMessage('Not logged in; e-mail or password invalid', 'danger');
  } else {
    // Save current page
    localStorage.setItem('currentPage', '/login');
    
    // Proceed to log in
    login();
  }
}

// Ref to hold Google user profile info
const googleProfile = ref();

// Helper function which handles the Google login process
function googleLoginProcess() {
  // Google E-mail
  const googleEmail = googleProfile.value.emailAddresses[0].value.toLowerCase();

  // Current date
  const date = new Date();

  // Set e-mail and password refs for Google login
  formEmail.value = googleEmail;
  formPassword.value = "";

  // If user with Google e-mail is not already in the database, register them as a new user
  if (!users.value.find(u => u.email === googleEmail)) {
    const googleNames = googleProfile.value.names[0];
    const googleBirthday = googleProfile.value.birthdays[0].date;

    // New user object
    const newUser = {
      username: googleNames.displayName.replace(/[^0-9a-z]/gi, '').substring(0, 16).padEnd(8, '0'),
      password: "",
      email: googleEmail,
      firstName: googleNames.givenName,
      lastName: googleNames.familyName,
      birthday: `${googleBirthday.year}-${(googleBirthday.month).toString().padStart(2, '0')}-${(googleBirthday.day).toString().padStart(2, '0')}`,
      friendsUserIDs: [],
      role: "user",
      joinDate: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDay().toString().padStart(2, '0')}`,
    } as User;

    // Create new user
    createUser(newUser).then((data) => {
      console.log(data);
      addMessage('New user created', 'success');
      
      // Proceed to log in
      login();
    });
  } else {
    // User with Google e-mail already exists, so simply log them in
    login();
  }
}

// Google login
async function googleLogin()
{
  // Get info
  await loadScript('https://accounts.google.com/gsi/client', 'google-login');
  
  const client = google.accounts.oauth2.initTokenClient({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/userinfo.email \
            https://www.googleapis.com/auth/userinfo.profile \
            https://www.googleapis.com/auth/user.birthday.read',
    callback: async (tokenResponse) => {
      console.log(tokenResponse);

      const me = await rest(
        'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,birthdays',
        null, undefined, {
          "Authorization": "Bearer " + tokenResponse.access_token
        }
      );
      console.log(me);
      googleProfile.value = me;

      // Call helper function to handle the login process
      googleLoginProcess();
    },
  });
  client.requestAccessToken();
}

</script>

<template>
  <!-- Banner on the top of the page -->
  <Banner>
    <template #title>
      Welcome back!
    </template>
    <template #subtitle>
      Log in below.
    </template>
  </Banner>
  
  <!-- Message to advertise registration -->
  <PopupMessage>
    <template #header>
      Don't have an account?
    </template>
    <template #body>
      Click the sign up button to register for an account on SushiFit today!
    </template>
  </PopupMessage>

  <!-- Login form -->
  <form class="block" novalidate @submit.prevent="validateData()">
    <PageBox>
      <FormField>
          <template #label>
            E-mail
          </template>

          <template #input>
            <input class="input" type="email" placeholder="Input e-mail address" v-model="formEmail">
          </template>

          <template #leftIcon>
            <i class="fas fa-envelope"></i>
          </template>
          <template #rightIcon>
            <i class="fas fa-check"></i>
          </template>

      </FormField>

      <FormField>
        <template #label>
          Password
        </template>

        <template #input>
          <input class="input" type="password" placeholder="Input password" v-model="formPassword">
        </template>

        <template #leftIcon>
          <i class="fas fa-lock"></i>
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
          <button class="button"><strong>Log In</strong></button>
        </template>

        <template #help>
          FOR TESTING PURPOSES: Use the e-mail "testuser1@mail.com" and the password "123456", both without quotations
        </template>
        <template #error>
          <div :class="{ 'is-hidden': validFields }">
            Invalid e-mail or password
          </div>
        </template>

      </FormField>

    </PageBox>
  </form>

  <!-- Button to log in with Google -->
  <div class="container">
    <button class="button is-link is-rounded" @click="googleLogin()">
      <span class="icon">
        <i class="fa-brands fa-google"></i>
      </span>
      <p>Log in with Google</p>
    </button>
  </div>
  
  <!-- Site logo on the bottom of the page -->
  <SiteLogo />
  
</template>

<style scoped>

</style>
