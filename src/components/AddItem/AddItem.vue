<template>
    <v-row justify="center">
        <v-btn @click="onEdit">Edit</v-btn>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="500"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="success"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                    Add Item
                </v-btn>
            </template>
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
                        :items="items"
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
    </v-row>
</template>

<script>
const requiredField = v => !!v && !!v.length || 'This field is required'

export default {
    name: 'AddItem',
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
            items: [
                {
                    catId: '1',
                    title: 'Main'
                },
                {
                    catId: '2',
                    title: 'War'
                },
                {
                    catId: '3',
                    title: 'Politic'
                },
                {
                    catId: '4',
                    title: 'Economy'
                },
                {
                    catId: '5',
                    title: 'Science'
                }
            ],
            news: [
                {
                    title: 'new Title',
                    body: 'new body',
                    catId: '3'
                }
            ],
            newsItem: {},
            isValid: true,
            rules: [requiredField]
        }
    },
    methods: {
        onEdit() {
            const item = this.news[0]
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
