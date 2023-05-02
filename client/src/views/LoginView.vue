<script setup lang="ts">
import { ref } from 'vue';
import { addMessage, useLogin } from '../model/session';
import { type User, getUsers } from '../model/users';
import Banner from '../components/Banner.vue';
import PageBox from '../components/PageBox.vue';
import FormField from '../components/FormField.vue';
import PopupMessage from '../components/PopupMessage.vue';
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
  // Find user in the database by their e-mail
  const userToLogin = users.value.find(u => u.email === formEmail.value)

  // Check if user exists and if their password is valid
  if(!userToLogin || userToLogin.password != formPassword.value) {
    validFields.value = false;
    console.log("E-mail or password invalid");
    addMessage('Not logged in; e-mail or password invalid', 'danger');
  } else {
    // Proceed to log in
    login();
  }
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

  <!-- Message to advertise registration -->
  <PopupMessage>
    <template #header>
      Don't have an account?
    </template>
    <template #body>
      Click the sign up button to register for an account on SushiFit today!
    </template>
  </PopupMessage>
  
  <!-- Site logo on the bottom of the page -->
  <SiteLogo />
  
</template>

<style scoped>

</style>
