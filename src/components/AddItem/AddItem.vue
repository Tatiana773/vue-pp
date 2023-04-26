<template>
    <div>
        <v-row justify="center">
            <v-col cols="12">
                <v-btn
                    color="success"
                    dark
                    @click="dialog = true"
                    class="ml-2"
                >
                    Add Item
                </v-btn>
            </v-col>
            <v-col cols="12">
                <w-data-table
                    :headers="headers"
                    :items="computedItems"
                    :search-by="['title', 'catTitle']"
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
                                    >
                                        <v-list-item-icon>
                                            <v-icon>{{action.icon}}</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-title>
                                            {{ action.text }}
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                    </template>
                </w-data-table>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="500"
        >
            <v-card class="pa-6">
                <v-form
                    ref="newsForm"
                    v-model="isValid"
                >
                    <v-text-field
                        v-model="newsItem.title"
                        v-bind="inputBindings"
                        label="Title"
                        :rules="rules"
                    />
                    <v-textarea
                        v-model="newsItem.body"
                        v-bind="inputBindings"
                        name="input-7-4"
                        label="Content"
                        :rules="rules"
                    />
                    <v-select
                        v-model="newsItem.catId"
                        :items="categories"
                        item-text="title"
                        item-value="catId"
                        label="Category"
                        v-bind="inputBindings"
                        :rules="rules"
                    />
                </v-form>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="purple darken-2"
                        text
                        @click="dialog = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="onAdd"
                    >
                        <v-icon
                            dark
                            left
                        >
                            mdi-checkbox-marked-circle
                        </v-icon>
                        {{buttonText}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

</template>

<script>
import {getItemsCategoriesCollection, getItemsCollection} from '@/api/items'
import breakpointChecker from '@/mixins/breakpointChecker'
import WDataTable from '@/Widgets/WDataTable'

const requiredField = v => !!v && !!v.length || 'This field is required'

export default {
    name: 'AddItem',
    components: { WDataTable },
    mixins: [
        breakpointChecker
    ],
    computed: {
        buttonText() {
            const isCreating = Object.keys(this.newsItem).length === 0

            return isCreating
                ? 'Create'
                : 'Update'
        },
        inputBindings() {
            return {
                outlined: true,
                dense: true
            }
        },
        headers() {
            const headers = [
                {
                    text: 'Title',
                    value: 'title'
                }
            ]

            if(!this.isMobile) {
                headers.push({
                    text: 'Category',
                    value: 'catTitle'
                })
            }

            headers.push({
                value: 'actions',
                sortable: false
            })

            return headers
        },
        computedItems() {
            const itemsCollection = this.itemsCollection
            const result = []

            itemsCollection.forEach(o => {
                result.push({
                    ...o,
                    catTitle: this.getCatTitle(o.catId)
                })
            })

            return result
        }
    },
    watch: {
        dialog(flag) {
            if(!flag) {
                this.onBack()
            }
        }
    },
    data() {
        return {
            dialog: false,
            categories: [],
            itemsCollection: [],
            newsItem: {},
            isValid: true,
            rules: [requiredField]
        }
    },
    async mounted() {
        await this.fetchItemsCategoryCollection()
        await this.fetchItemsCollection()
    },
    methods: {
        async fetchItemsCategoryCollection() {
            try {
                const response = await getItemsCategoriesCollection()
                this.categories = response.data
            } catch (e) {
                console.log(e)
            }
        },
        async fetchItemsCollection() {
            try {
                const response = await getItemsCollection()
                this.itemsCollection = response.data
            } catch (e) {
                console.log(e)
            }
        },
        getCatTitle(catId) {
            const category =  this.categories.find(o => o.catId === catId)

            return !category ? 'Unknown' : category.title
        },
        itemActions(item) {
            return [
                {
                    text: 'Edit',
                    icon: 'mdi-pencil',
                    color: 'success',
                    callback: () => {
                        this.onEdit(item)
                    }
                },
                {
                    text: 'Delete',
                    icon: 'mdi-delete',
                    color: 'error',
                    callback: () => {
                        console.log('Delete.item', item)
                    }
                }
            ]
        },
        onEdit(item) {
            this.newsItem = Object.assign({}, item)
            this.dialog = true
        },
        onBack() {
            this.newsItem = {}
            this.$refs.newsForm.reset()
        },
        onAdd() {
            if(!this.$refs.newsForm.validate()) {
                return
            }

            this.news.push(this.newsItem)

            console.log('this.news', this.news)
        }


    }
}
</script>
