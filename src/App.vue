<template>
    <v-app>
        <v-main>
            <v-container>
                <v-model-example/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import VModelExample from '@/components/Examples/VModelExample.vue'

export default {
    name: 'App',

    components: { VModelExample },

    data: () => ({
        //
    })
}
</script>

<style>

</style>
