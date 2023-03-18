<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useSession } from '../model/session';
import ProfilePicture from '../components/ProfilePicture.vue';

// Reactive session object
const session = useSession();
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
      <nav class="level mt-4">
        <div class="level-item">
          <p class="title date-text">Joined 3/18/2023</p>
        </div>
      </nav>

      <!-- Horizontal Divider -->
      <hr>

      <!-- Number of friends, exercises, and meals -->
      <nav class="level mt-6">
        <div class="level-item">
          <table class="table is-bordered is-hoverable">
            <tr>
              <td>
                <span class="icon"><i class="fas fa-users"></i></span>
                <span class="title table-text ml-2">0 Friends</span>
              </td>
              <td>
                <span class="icon"><i class="fas fa-person-skating"></i></span>
                <span class="title table-text ml-2">0 Exercises</span>
              </td>
              <td>
                <span class="icon"><i class="fas fa-bowl-rice"></i></span>
                <span class="title table-text ml-2">0 Meals</span>
              </td>
            </tr>   
          </table>
        </div>
      </nav>

      <br>
      
      <!-- First and last names -->
      <nav class="level mt-6">
        <div class="level-item">
          <p class="title name-text">{{ session.user.firstName }} {{ session.user.lastName }}</p>
        </div>
      </nav>

      <!-- Birthday -->
      <nav class="level mt-6">
        <div class="level-item">
          <p class="title date-text">Born {{ session.user.birthday }}</p>
        </div>
      </nav>

      <!-- E-mail address -->
      <nav class="level">
        <div class="level-item">
          <p class="title email-text">{{ session.user.email }}</p>
        </div>
      </nav>
      
      <br><br><br><br>

      <!-- Edit profile button -->
      <nav class="level mb-6">
        <div class="level-item">
          <button class="button is-danger is-rounded">Edit Profile</button>
        </div>
      </nav>

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
