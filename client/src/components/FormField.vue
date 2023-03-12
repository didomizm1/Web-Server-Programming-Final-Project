<script setup lang="ts">

</script>

<template>
    <div class="field">
        <label class="label">
            <slot name="label"></slot>
        </label>
        <div class="control has-icons-left has-icons-right">
            <slot name="input"></slot>
            <span class="icon is-left">
                <slot name="leftIcon"></slot>
            </span>
            <span class="icon is-right">
                <slot name="rightIcon"></slot>
            </span>
        </div>
        <p class="help is-success is-hidden">
            <slot name="help"></slot>
        </p>
    </div>
</template>

<style scoped>

</style>