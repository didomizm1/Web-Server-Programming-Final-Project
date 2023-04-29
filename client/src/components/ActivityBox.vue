<script setup lang="ts">

</script>

<template>
    <!-- A custom box that displays information about a certain activity performed by the user -->
    <div class="box has-background-danger-light">
        <article class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                    <slot name="profilePicture"></slot>
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong><slot name="name"></slot></strong> <small>(<slot name="username"></slot>) on <slot name="timestamp"></slot></small>
                        <br>
                        <slot name="workout"></slot> in <slot name="location"></slot>
                        <div class="columns top-columns">
                            <div class="column has-text-centered">
                                <div>
                                    <div class="heading">Distance:</div>
                                    <div class="title"><slot name="distance"></slot> miles</div>
                                </div>
                            </div>
                            <div class="column has-text-centered">
                                <div>
                                    <div class="heading">Duration:</div>
                                    <div class="title"><slot name="duration"></slot> minutes</div>
                                </div>
                            </div>
                            <div class="column is-4"></div>
                        </div>
                        <div class="columns">
                            <div class="column">
                                <slot name="image"></slot>
                            </div>
                            <div class="column"></div>
                        </div>
                    </p>
                </div>
            </div>
        </article>
        
    </div>
</template>

<style scoped>
.box {
    outline: solid 5px;
    box-shadow: 10px 10px 10px;
    margin-bottom: 5rem;
}
.media-content {
    overflow: hidden;
}
.top-columns {
    margin-top: 1rem;
}
.column {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}
.heading {
    font-size: 0.8rem;
}
.title {
    font-size: max(2vw, 1.5rem);
}
</style>