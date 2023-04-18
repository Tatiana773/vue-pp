<template>
    <v-app>
        <v-main>
            <v-container>
                <div>
                    <v-model-example
                        v-model="inputValue"
                        :selected-item.sync="selectedItem"
                    />
                </div>
                <div>
                    inputValue: {{inputValue}}
                </div>
                <div>
                    selectedItem: {{ selectedItem }}
                </div>
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
        newsItem: {},
        inputValue: '',
        selectedItem: null
    }),

    methods: {
    }
}
</script>

<style>

</style>
