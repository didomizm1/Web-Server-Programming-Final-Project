<script setup lang="ts">
import Banner from '../components/Banner.vue';
import CustomForm from '../components/CustomForm.vue';
import FormField from '../components/FormField.vue';
import PopupMessage from '../components/PopupMessage.vue';
import SiteLogo from '../components/SiteLogo.vue';
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
  <CustomForm>
    <FormField>
        <template #label>
          Username
        </template>

        <template #input>
          <input class="input" type="text" placeholder="Input username">
        </template>

        <template #leftIcon>
          <i class="fas fa-user"></i>
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
        <input class="input" type="password" placeholder="Input password">
      </template>

      <template #leftIcon>
        <i class="fas fa-lock"></i>
      </template>
      <template #rightIcon>
        <i class="fas fa-check"></i>
      </template>

    </FormField>

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

  </CustomForm>

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
