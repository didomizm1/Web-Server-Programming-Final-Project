<script setup lang="ts">
import { useSession } from '../model/session';
import PageBox from '../components/PageBox.vue';

// Reactive session object
const session = useSession();
</script>

<template>
  <!-- Page that displays profile info and allows the user to edit their details -->
  <PageBox>
    <div class="content">
      <EditableInfo>

      </EditableInfo>
    </div>
  </PageBox>
</template>

<style scoped>

</style>
