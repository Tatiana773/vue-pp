<template>
    <div class="v-model-example">
        <div>
            <input
                type="text"
                v-model="inputValue"
                class="native-input"
            />
        </div>
        <div class="mt-5">
            <v-text-field
                v-model="inputValue"
                label="VModelValue"
                outlined
                dense
            />
        </div>
        <div>
            <v-select
                v-model="selectedItem"
                :items="selectItems"
                item-text="title"
                item-value="id"
            />
        </div>
        <div>
            <div>
                InputValue: {{ inputValue }}
            </div>
            <div>
                selectedItem: {{ selectedItem }}
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'VModelExample',
    data() {
        return {
            inputValue: '',
            selectedItem: null,
            selectItems: [
                {
                    title: "Item 1",
                    id: 'item-1'
                },
                {
                    title: "Item 2",
                    id: 'item-2'
                }
            ]
        }
    },
    methods: {
        vBindSelect() {
            return {
                items: this.selectedItem,
                itemText: 'title',
                itemValue: 'id'
            }
        }
    }
}
</script>

<style lang="scss">
    .v-model-example {
        .native-input {
            border: #000 solid 1px;
        }
    }
</style>
