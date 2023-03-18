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
      Registration
    </template>
    <template #subtitle>
      Sign up below.
    </template>
  </Banner>

  <!-- Registration form -->
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

      <template #help>
        Must be at least 8 characters long and contain at least one uppercase letter, lowercase letter, number, and symbol [ <strong>!@#$%&?_</strong> ]
      </template>
      <template #success>
        Valid password
      </template>
      <template #error>
        Invalid password
      </template>

    </FormField>

    <br>

    <FormField>
      <template #label>
        E-mail
      </template>

      <template #input>
        <input class="input" type="email" placeholder="youremail@site.com">
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
        <input class="input" type="text" placeholder="Your first name">
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
        <input class="input" type="text" placeholder="Your last name">
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
        <input class="input date" type="date">
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

  </CustomForm>

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
