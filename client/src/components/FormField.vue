<script setup lang="ts">

</script>

<template>
    <!-- Outline of a field to be used inside of a form -->
    <div class="field">
        <label class="label">
            <slot name="label"></slot>
        </label>
        <div class="control has-icons-left has-icons-right">
            <slot name="input"></slot>
            <span class="icon is-left">
                <slot name="leftIcon"></slot>
            </span>
            <span class="icon is-right is-hidden">
                <slot name="rightIcon"></slot>
            </span>
        </div>
        <p class="help">
            <slot name="help"></slot>
        </p>
        <p class="help is-success">
            <slot name="success"></slot>
        </p>
        <p class="help is-danger">
            <slot name="error"></slot>
        </p>
    </div>
</template>

<style scoped>

</style>