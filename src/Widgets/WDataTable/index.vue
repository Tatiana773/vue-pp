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
        searchBy: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    computed: {
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
    data() {
        return {
            search: ''
        }
    }
}
</script>

<style lang=scss>

</style>
