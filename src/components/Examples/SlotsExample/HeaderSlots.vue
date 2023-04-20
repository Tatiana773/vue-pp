<template>
    <header class="d-flex align-center">
        <h1>
            <slot></slot>
        </h1>
        <v-spacer/>
        <div>
            <slot name="action"></slot>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderSlots'
}
</script>

<style lang=scss>

</style>
