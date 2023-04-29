<script setup lang="ts">
import { ref } from 'vue';
import { useLogin } from '../model/session';
import Banner from '../components/Banner.vue';
import PageBox from '../components/PageBox.vue';
import FormField from '../components/FormField.vue';
import PopupMessage from '../components/PopupMessage.vue';
import SiteLogo from '../components/SiteLogo.vue';

// Refs to hold information from the form
const formEmail = ref<string>();
const formPassword = ref<string>();

// Login function
const login = useLogin(formEmail, formPassword);

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
  <form class="block" @submit.prevent="login()">
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

        <template #error>
          Invalid username or password
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
