<script setup lang="ts">
import { useSession } from '../model/session';
import ProfilePicture from '../components/ProfilePicture.vue';
import EditableInfo from '../components/EditableInfo.vue';

// Reactive session object
const session = useSession();
</script>

<template>
  <!-- Page that displays profile info and allows the user to edit their details -->
  <template v-if="session.user">
    <div class="container">
      <nav class="level mt-6">
        <div class="level-item">
          <ProfilePicture class="picture mr-2" />
        </div>
        <div class="level-item ml-2 mt-5">
          <p class="heading username">{{ session.user.username }}</p>
        </div>
      </nav>

      <EditableInfo>

      </EditableInfo>
    </div>
  </template>
</template>

<style scoped>
.picture {
    width: 10rem;
    height: 10rem;
    margin-top: 1.125rem;
    margin-left: 1rem;
}
.username {
  font-size: 2rem;
}
</style>
