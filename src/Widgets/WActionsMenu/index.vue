<template>
    <div>
        <div
            v-if="inline"
            class="d-flex justify-end"
        >
            <v-btn
                v-for="(action, index) in items"
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
                <template #activator="props">
                    <slot
                        name="activator"
                        v-bind="props"
                    >
                        <v-btn
                            icon
                            v-bind="props.attrs"
                            v-on="props.on"
                        >
                            <v-icon>
                                {{ icon }}
                            </v-icon>
                        </v-btn>
                    </slot>
                </template>
                <v-list>
                    <v-list-item
                        v-for="(action, index) in items"
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
        name: 'WActionsMenu',
        props: {
            icon: {
                type: String,
                default: 'mdi-dots-vertical'
            },
            inline: {
                type: Boolean,
                default: false
            },
            items: {
                type: [],
            }
        }
    }
</script>
