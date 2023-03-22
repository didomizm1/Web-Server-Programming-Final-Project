<script setup lang="ts">
import Banner from '../components/Banner.vue';
import StatsBox from '../components/StatsBox.vue';
</script>

<template>
    <!-- Banner on the top of the page -->
    <Banner>
        <template #title>
            Statistics
        </template>
        <template #subtitle>
            View detailed stats about your routine!
        </template>
    </Banner>

    <!-- Statistics for different periods of time -->
    <!-- Today -->
    <StatsBox>

    </StatsBox>

    <!-- This week -->
    <StatsBox>
        
    </StatsBox>

    <!-- All time -->
    <StatsBox>
        
    </StatsBox>

</template>

<style scoped>

</style>