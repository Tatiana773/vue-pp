<template>
    <header-slots>
        Slots example
        <template #action>
            Actions
        </template>
    </header-slots>
</template>

<script>
import HeaderSlots from '@/components/Examples/SlotsExample/HeaderSlots.vue'

export default {
    name: 'SlotsExample',
    components: { HeaderSlots }
}
</script>

<style lang=scss>

</style>
