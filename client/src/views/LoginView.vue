<script setup lang="ts">
import Banner from '@/components/Banner.vue';
import CustomForm from '@/components/CustomForm.vue';
import FormField from '@/components/FormField.vue';
</script>

<template>
<div>
  <Banner>
    <template #title>
      Welcome back!
    </template>
    <template #subtitle>
      Log in below.
    </template>
  </Banner>
  
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
          Valid username
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
        Valid password
      </template>
    </FormField>

  </CustomForm>
  
</div>
</template>

<style scoped>

</style>
