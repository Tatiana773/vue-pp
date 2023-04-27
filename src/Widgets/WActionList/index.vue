<template>
    <div>
        <div
            v-if="!mobile"
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
                        @click="action.callback"
                    >
                        <v-list-item-icon>
                            <v-icon
                            :color="action.color"
                            >{{action.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            {{ action.text }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>

    </div>
</template>
<script>
    export default{
        name: 'WActionList',
        props: {
            item: {
                type: Object,
            },
            mobile: {
                type: Boolean,
            },
            itemActions: {
                type: Function,
            }
        }
    }
</script>