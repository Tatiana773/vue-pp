<template>
    <v-row justify="center">
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
        <v-card class = "pa-6">
            <v-text-field
            label="Title"
            outlined
            dense
            :value="titleValue"
            @input="onTitleChange"
            ></v-text-field>
            <v-textarea
            outlined
            name="input-7-4"
            label="Content"
            :value="contentValue"
            @input="onContentChange"
            ></v-textarea>
            <v-select
            :items="items"
            item-text="title" 
            item-value="catId"
            label="Category"
            outlined
            dense
            :value="categoryValue"
            @change="onCategoryChange"
            ></v-select>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="purple darken-2"
                text
                @click="onBack"
                >
                <v-icon
                dark
                left
                >
                mdi-arrow-left
                </v-icon>
                Back
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
                Add
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: "AddItem",
    data () {
        return {
        dialog: false,
        items: [
            {
                catId: "1",
                title: "Main"
            },
            {
                catId: "2",
                title: "War",
            },
            {
                catId: "3",
                title: "Politic",
            },
            {
                catId: "4",
                title: "Economy",
            },
            {
                catId: "5",
                title: "Science",
            }
        ],
        titleValue: "",
        contentValue: "",
        categoryValue: "",
        news: [],
        }
    },
    methods: {
        onTitleChange(value){
            this.titleValue = value
        },
        onContentChange(value){
            this.contentValue = value
        },
        onCategoryChange(value){
            this.categoryValue = value
        },
        onBack(){
            this.dialog = false,
            this.titleValue = "",
            this.contentValue = "",
            this.categoryValue = ""
        },
        onAdd(){
            this.news.push({
                newsId: this.news.length + 1,
                title: this.titleValue,
                body: this.contentValue,
                categoryId: this. categoryValue,

            });
           this.onBack()
                
            console.log('this.news', this.news)
        },
       

    }
}
</script>