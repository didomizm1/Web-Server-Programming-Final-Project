<script setup lang="ts">
import CustomLevel from './CustomLevel.vue';
</script>

<template>
    <!-- Container for statistics about a single day of exercises -->
        <div class="box has-background-warning-light">
            <CustomLevel>
                <div class="heading"><slot name="date"></slot></div>
            </CustomLevel>
            <br>

            <CustomLevel>
                <div class="heading">Distance:</div>
            </CustomLevel>
            <CustomLevel>
                <div class="title"><slot name="distance"></slot></div>
            </CustomLevel>
            <br>

            <CustomLevel>
                <div class="heading">Duration:</div>
            </CustomLevel>
            <CustomLevel>
                <div class="title"><slot name="duration"></slot></div>
            </CustomLevel>
            <br>

            <CustomLevel>
                <div class="heading">Pace:</div>
            </CustomLevel>
            <CustomLevel>
                <div class="title"><slot name="pace"></slot></div>
            </CustomLevel>
            <br>

            <CustomLevel>
                <div class="heading">Calories Burned:</div>
            </CustomLevel>
            <CustomLevel>
                <div class="title"><slot name="calories"></slot></div>
            </CustomLevel>
            <br>

        </div>
</template>

<style scoped>
.box {
    outline: solid 5px;
    margin-bottom: 5rem;
}
</style>