<template>
    <div>
        <div>
            <v-text-field
                v-model="search"
            />
        </div>
        <v-data-table
            :headers="headers"
            :items="computedItems"
            :mobile-breakpoint="mobileBreakpoint"
            :footer-props="computedFooterProps"
            :options.sync="localOptions"
            :server-items-length="serverItemsLength"
            :items-per-page="itemsPerPage"
        >
            <template
                v-for="headerItem in headers"
                #[`item.${headerItem.value}`]="{item}"
            >
                <slot :name="`item.${headerItem.value}`" :item="item">
                    {{ item[headerItem.value] }}
                </slot>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    name: 'WDataTable',
    props: {
        headers: {
            type: Array,
            default: function() {
                return []
            }
        },
        items: {
            type: Array,
            default: function() {
                return []
            }
        },
        mobileBreakpoint: {
            type: [String, Number],
            default: 600
        },
        footerProps: {
            type: Object,
            default: undefined
        },
        searchBy: {
            type: Array,
            default: function() {
                return []
            }
        },
        options: {
            type: Object,
            default: undefined
        },
        serverItemsLength: {
            type: Number,
            default: undefined
        },
        itemsPerPage: {
            type: Number,
            default: 10
        }
    },
    computed: {
        computedFooterProps() {
            const defaultProps = {
                itemsPerPageOptions: [ 25, 50, 100, -1 ]

            }

            return Object.assign(defaultProps, this.footerProps)
        },
        computedItems() {
            if(!this.search) {
                return this.items
            }

            if(this.searchBy.length === 0) {
                return this.items
            }

            return this.items.filter(o => {
                for (let i = 0; i < this.searchBy.length; i++) {
                    const field = this.searchBy[i]

                    if(o[field].includes(this.search)) {
                        return true
                    }
                }
            })
        }
    },
    watch: {
        localOptions(options) {
            this.$emit('update:options', options)
        }
    },
    data() {
        return {
            search: '',
            localOptions: null
        }
    }
}
</script>

<style lang=scss>

</style>
