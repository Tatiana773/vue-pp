<template>
     <v-data-table
                    :headers="headers"
                    :items="computedItems"
                    mobile-breakpoint="0"
                >
                    <template #item.actions="{item}">
                        <div
                            v-if="!isMobile"
                            class="d-flex justify-end"
                        >
                            <v-btn
                                v-for="(action, index) in itemActions(item)"
                                :key="index"
                                icon
                                :color="action.color"
                                @click="action.callback"
                            >
                                <v-icon
                                >
                                    {{action.icon}}
                                </v-icon>
                            </v-btn>
                        </div>
                        <div
                            v-else
                            class="d-flex justify-end"
                        >
                            <v-menu offset-y>
                                <template #activator="{ on, attrs }">
                                    <v-btn
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>
                                            mdi-dots-vertical
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item
                                        v-for="(action, index) in itemActions(item)"
                                        :key="index"
                                        :color="action.color"
                                        @click="action.callback"
                                        
                                    >
                                        <v-list-item-icon>
                                            <v-icon 
                                            :color="action.color"
                                            >
                                            {{action.icon}}
                                        </v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-title>
                                            {{ action.text }}
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                    </template>
                </v-data-table>
</template>
<script>
export default {
    name: 'DataTable',
    props: {
        headers: {
            type: Array,
        },
        computedItems: {
            type: Array,
        },
        onEdit: {
            type: Function,
        },
        onDelete: {
            type: Function,
        },
        isMobile: {
            type: Boolean,
        }
    },
    methods: {
        itemActions(item) {
            return [
                {
                    text: 'Edit',
                    icon: 'mdi-pencil',
                    color: 'success',
                    callback: () => {
                        this.$emit('onEdit', item)
                    }
                },
                {
                    text: 'Delete',
                    icon: 'mdi-delete',
                    color: 'error',
                    callback: () => {
                        this.$emit('onDelete', item.id)
                    }
                }
            ]
        },
    }

}
</script>
