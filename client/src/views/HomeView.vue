<script setup lang="ts">
import SiteLogo from '../components/SiteLogo.vue';
import Quote from '../components/Quote.vue'

// Save current page
localStorage.setItem('currentPage', '/');

</script>

<template>
    <!-- Site logo -->
    <SiteLogo class="logo" />

    <!-- Quotes -->
    <Quote>
        <template #text>
            All man are the same except for their belief in their own selves, regardless of what others may think of them.
        </template>
        <template #person>
            Miyamoto Musashi
        </template>
    </Quote>

    <Quote>
        <template #text>
            Greatness as a leader is measured in part by your willingness to accept daunting challenges. Achieving tough goals requires practicing the secret of commitment: Risk all to win all.
        </template>
        <template #person>
            Toyotomi Hideyoshi
        </template>
    </Quote>
    
    <Quote>
        <template #text>
            Patience is the key to any battle.
        </template>
        <template #person>
            Tokugawa Ieyasu
        </template>
    </Quote>    

</template>

<style scoped>
.logo {
    margin-bottom: 15vh;
}
</style>
